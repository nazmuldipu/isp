import { Injectable } from '@angular/core';
import { SMS } from 'shared/models/sms.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrderByDirection } from '@firebase/firestore-types';
import { Customer } from 'shared/models/customer.model';
import { Company } from 'shared/models/company.model';
import { CompileNgModuleMetadata } from '@angular/compiler';
import { SmsApiService } from 'shared/services/sms-api.service';

@Injectable()
export class SmsService {
  serviceUrl = 'sms';

  private _smsSource = new BehaviorSubject<SMS[]>([]);
  smss$ = this._smsSource.asObservable();
  smss: SMS[] = [];
  companyId;

  constructor(
    private afs: AngularFirestore,
    private smsApi: SmsApiService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  create(sms: SMS) {
    delete sms["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...sms
    });
  }

  getAll(companyId) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy('date')).snapshotChanges()
      .subscribe(data => {
        this.smss = [];
        data.forEach(resp => {
          let sms = resp.payload.doc.data() as SMS;
          sms.id = resp.payload.doc.id;
          this.smss.push(sms);
        });
        this._smsSource.next(this.smss);
      })
  }

  get(sid) {
    return this.afs.doc(this.serviceUrl + '/' + sid).valueChanges();
  }

  getPaginatedStartAfter(companyId, orderBy, order: OrderByDirection = 'asc', limit, startAfter) {
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy(orderBy, order).limit(limit).startAfter(startAfter)).snapshotChanges();
  }
  
  update(sid, sms: SMS) {
    delete sms["id"]
    return this.afs.doc(this.serviceUrl + '/' + sid).update({
      ...sms
    });
  }

  delete(sid) {
    return this.afs.doc(this.serviceUrl + '/' + sid).delete();
  }


  sendRegistrationSMS(customer: Customer, company: Company){
    let message = 'Dear ' + customer.name + ', Welcome to ' + company.companyName + '. You have successfully registered for our company service. Thank you for having faith in us-'+company.telephone;
    this.smsApi.sendSMSUrl(customer.phone, message, false);
  }

}
