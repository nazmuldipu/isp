import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/forkJoin';
import { Company } from 'shared/models/company.model';
import { Customer } from 'shared/models/customer.model';
import { SMS } from 'shared/models/sms.model';
import { AuthService } from 'shared/services/auth.service';
import { CompanyService } from 'shared/services/company.service';
import { CustomerService } from 'shared/services/customer.service';
import { SmsApiService } from 'shared/services/sms-api.service';
import { SmsService } from 'shared/services/sms.service';
import { CompileDirectiveMetadata } from '@angular/compiler';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit {
  userId;
  companyId;
  company: Company;
  customers: Customer[] = [];
  subscription: Subscription;
  message = '';
  errorMessage = '';
  showSpiner = false;

  constructor(
    private auth: AuthService,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private smsService: SmsService,
    private smsApiService: SmsApiService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    if (this.companyId) {
      // Load company Info
      this.subscription = await this.companyService
        .get(this.companyId)
        .take(1)
        .subscribe(
          data => (this.company = data),
          error => console.log('Company info loading error', error)
        );

      // load activeCustomer
      this.subscription = await this.customerService
        .getActiveCustomers(this.companyId)
        .subscribe(item => {
          this.customers = item.filter(cus => cus.active == true);
        });

      // Load user id
      this.subscription = await this.auth.user$.subscribe(usr => {
        this.userId = usr.uid;
      });
    }
  }

  balanceSMS() {
    let smsURL = [];
    let saveSmsResult = [];
    let time = new Date();
    let quota = this.company.smsQuota;
    this.showSpiner = true;
    if (quota > this.customers.length) {
      this.customers.forEach(cus => {
        time.setSeconds(time.getSeconds() + 1);
        let smsmessage =
          'Dear customer, your current balance is ' +
          cus.balance +
          'taka, please pay your monthly bill. Thank you. Regards-' +
          this.company.companyName +
          this.company.telephone;
        let sms = new SMS(
          '',
          null,
          null,
          new Date(),
          this.companyId,
          this.userId,
          cus.phone,
          smsmessage,
          'SEND SMS ' + --quota
        );
        saveSmsResult.push(this.smsService.create(sms));
        smsURL.push(
          this.smsApiService.sendSMSUrl(cus.phone, smsmessage, false)
        );
      });

      //update company SMS QUOTA
      this.company.smsQuota = quota;
      saveSmsResult.push(
        this.companyService.update(this.companyId, this.company)
      );
      Observable.forkJoin(smsURL) //Send sms
        .subscribe(
          data => {
            this.showSpiner = false;
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );

      Observable.forkJoin(saveSmsResult) //Observe save SMS and update compnay SMS quota
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.errorMessage = 'Sorry! no sms quota, buy sms first';
    }
  }

  clear() {
    this.showSpiner = false;
    this.message = '';
    this.errorMessage = '';
  }
}
