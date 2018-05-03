import { Injectable } from '@angular/core';
import { SMS } from 'shared/models/sms.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { OrderByDirection } from '@firebase/firestore-types';
import { Customer } from 'shared/models/customer.model';
import { Company } from 'shared/models/company.model';
import { CompileNgModuleMetadata } from '@angular/compiler';
import { SmsApiService } from 'shared/services/sms-api.service';
import { CompanyService } from 'shared/services/company.service';

@Injectable()
export class SmsService {
  serviceUrl = 'sms';
  companyId;
  userId;

  private _smsSource = new BehaviorSubject<SMS[]>([]);
  smss$ = this._smsSource.asObservable();
  smss: SMS[] = [];


  constructor(
    private afs: AngularFirestore,
    private smsApi: SmsApiService,
    private companyService: CompanyService
  ) {
    this.companyId = localStorage.getItem('companyId');
    this.userId = localStorage.getItem('userId');
  }

  create(sms: SMS) {
    delete sms["id"];
    sms.createdDate = new Date();
    sms.createdBy = this.userId;
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
    return this.afs.collection(this.serviceUrl, ref => ref.where('companyId', '==', companyId).orderBy(orderBy, order).orderBy('createdDate', order).limit(limit).startAfter(startAfter)).snapshotChanges();
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


  sendRegistrationSMS(customer: Customer, company: Company) {
    if (company.smsQuota > 0) {
      company.smsQuota--;
      let message = 'Dear ' + customer.name + ', Welcome to ' + company.companyName + '. You have successfully registered for our company service. Thank you for having faith in us-' + company.telephone;
      let sms = new SMS(null, null, null, new Date(), this.companyId, this.userId, customer.phone, message, 'REGISTRATION SMS : ' + company.smsQuota);

      this.smsApi.sendSMSUrl(customer.phone, message, false)
        .subscribe(
          data => {
            console.log('SMS send ok; ', data);
          },
          error => {
            console.log('Error sms could not send', error);
          }
        );

      this.create(sms)
        .then(ref => console.log('SMS history created'));

      this.companyService.update(company.id, company)
        .then(ref => console.log('company sms quota updated'));
    }
  }

}
