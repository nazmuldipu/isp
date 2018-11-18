import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap } from 'rxjs/operators';
import { Zone } from '../models/zone.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  serviceUrl = 'zones';
  companyId;
  userId;

  private _zoneSource = new BehaviorSubject<Zone[]>([]);
  zones$ = this._zoneSource.asObservable();
  zones: Zone[] = [];

  constructor(private afs: AngularFirestore) {
    this.companyId = localStorage.getItem('companyId');
    this.userId = localStorage.getItem('userId');
    this.getAllAndStore(this.companyId);
  }

  getAllAndStore(companyId: string) {
    this.afs
      .collection(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', companyId)
          .orderBy('name')
          .orderBy('createdDate')
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Zone;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe(data => {
        this.zones = data;
        this._zoneSource.next(this.zones);
      });
  }

  create(zone: Zone) {
    delete zone['id'];
    return this.afs.collection(this.serviceUrl).add({
      ...zone,
      createdDate: new Date(),
      createdBy: this.userId,
      companyId: this.companyId
    });
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + `/${id}`).valueChanges();
  }

  getAll() {
    return this.afs
      .collection<Zone>(this.serviceUrl, ref =>
        ref
          .where('companyId', '==', this.companyId)
          .orderBy('name')
          .orderBy('createdDate')
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Zone;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  update(id, zone: Zone) {
    delete zone['id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...zone,
      updateDate: new Date()
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
