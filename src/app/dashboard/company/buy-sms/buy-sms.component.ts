import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from 'shared/services/company.service';
import { Subscription } from 'rxjs/Subscription';
import { Company } from 'shared/models/company.model';

@Component({
  selector: 'buy-sms',
  templateUrl: './buy-sms.component.html',
  styleUrls: ['./buy-sms.component.css']
})
export class BuySmsComponent implements OnInit, OnDestroy {
  company: Company;
  companies: Company[] = [];
  subscription: Subscription;
  numberOfSMS;
  message = '';
  errorMessage = '';

  constructor(
    private companyService: CompanyService
  ) {
    this.company = new Company();
  }

  async ngOnInit() {
    this.subscription = await this.companyService.getAll()
      .subscribe(data => {
        this.companies = [];
        data.forEach(resp => {
          let comp = resp.payload.doc.data() as Company;
          comp.id = resp.payload.doc.id;
          this.companies.push(comp);
        });
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editCompany(id) {
    Object.assign(this.company, this.companies.find(cmp => cmp.id === id));
  }

  save(form) {
    this.company.smsQuota += this.numberOfSMS;
    console.log(this.company);
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
