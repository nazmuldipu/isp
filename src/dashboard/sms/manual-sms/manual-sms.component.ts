import 'rxjs/add/observable/forkJoin';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Company } from 'shared/models/company.model';
import { SMSResponse } from 'shared/models/sms-response.model';
import { SMS } from 'shared/models/sms.model';
import { AuthService } from 'shared/services/auth.service';
import { CompanyService } from 'shared/services/company.service';
import { SmsApiService } from 'shared/services/sms-api.service';
import { SmsService } from 'shared/services/sms.service';

@Component({
  selector: 'app-manual-sms',
  templateUrl: './manual-sms.component.html',
  styleUrls: ['./manual-sms.component.css']
})
export class ManualSmsComponent implements OnInit {

  userId;
  companyId;
  company: Company;
  phone;
  smsMessge;
  message = '';
  errorMessage = '';
  showSpiner = false;
  subscription: Subscription;

  constructor(
    private companyService: CompanyService,
    private smsApiService: SmsApiService,
    private smsService: SmsService,
    private auth: AuthService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    if (this.companyId) {
      //Load company Info
      this.subscription = await this.companyService.get(this.companyId)
        .subscribe(c => {
          this.company = c as Company;
        });

      //Load User info
      this.subscription = await this.auth.user$
        .subscribe(usr => {
          this.userId = usr.uid;
        })
    }
  }

  send(manualSMS) {
    // this.smsApiService.sendManualSMSEng(this.companyId, this.phone, this.smsMessge);
    if (this.company.smsQuota < 1) {
      this.errorMessage = 'Sorry your SMS balance is below the students number, Buy SMS first';
    }
    else {
      let quota = this.company.smsQuota;
      let smsURL = [];
      let saveResult = [];
      this.showSpiner = true;
      let sms = new SMS('', null, null, new Date(), this.companyId, this.userId, this.phone, this.smsMessge, 'MNUAL SMS : ' + --quota)
      delete sms["id"];
      smsURL.push(this.smsApiService.sendSMSUrl(sms.phone, sms.message));
      saveResult.push(this.smsService.create(sms));

      //update company SMS QUOTA 
      this.company.smsQuota = quota;
      saveResult.push(this.companyService.update(this.companyId, this.company));

      Observable.forkJoin(smsURL)
        .subscribe(
          data => {
            this.clear();
            this.message += 'Total : ' + data.length + '; ';
            var time = new Date();
            data.forEach(dt => {
              let res = dt as SMSResponse;
              this.message += res.phone + ' : ' + res.resp + '; '
            })
          })

      Observable.forkJoin(saveResult)//Observe save SMS and update compnay SMS quota
        .subscribe(
          data => {
            this.showSpiner = false;
          },
          error => {
            console.log(error)
          }
        );
    }
  }
  // Remove non ascii key from name
  nameKeyup(value: string) {
    if (value != null) {
      this.smsMessge = value.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
    }
  }

  clear() {
    this.message = '';
    this.errorMessage = '';
    this.phone = '';
    this.smsMessge = '';
  }

}
