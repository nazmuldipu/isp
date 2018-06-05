import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from 'shared/services/company.service';
import { Subscription } from 'rxjs/Subscription';
import { Company } from 'shared/models/company.model';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';

@Component({
  selector: 'buy-sms',
  templateUrl: './buy-sms.component.html',
  styleUrls: ['./buy-sms.component.css']
})
export class BuySmsComponent implements OnInit, OnDestroy {
  companies$: Observable<Company[]>;
  subscriptions: Subscription;

  company: Company;
  numberOfSMS;
  message = '';
  errorMessage = '';

  constructor(
    private store: Store,
    private companyService: CompanyService
  ) {
    this.company = new Company();
  }

  async ngOnInit() {
    this.companies$ = this.store.select<Company[]>('company');
    this.subscriptions = this.companyService.company$.subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  editCompany(id: string) {
    console.log(id);
    this.companies$.subscribe(
      data => {
        const ecompany = data.find(com => com.id === id) as Company;
        Object.assign(this.company, ecompany);
      }
    )
  }

  save(form) {
    this.company.smsQuota += this.numberOfSMS;
    if (this.company.id) {
      let newCompany = JSON.parse(JSON.stringify(this.company))//remove all null values from object
      this.companyService.update(this.company.id, newCompany)
        .then(() => {
          this.message = "SMS bought successfully"
        })
        .catch((error) => {
          this.errorMessage = "SMS Bying ERROR ! ", error;
          console.log("SMS Bying ERROR ! ", error);
        });
      this.clear();
    }
  }

  clear() {
    this.message = '';
    this.errorMessage = '';
    this.numberOfSMS = '';
    this.company = new Company();
  }

}
