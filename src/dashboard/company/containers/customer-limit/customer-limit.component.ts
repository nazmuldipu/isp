import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Company } from 'shared/models/company.model';
import { CompanyService } from 'shared/services/company.service';
import { Store } from 'store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customer-limit',
  templateUrl: './customer-limit.component.html',
  styleUrls: ['./customer-limit.component.css']
})
export class CustomerLimitComponent implements OnInit, OnDestroy {
  companies$: Observable<Company[]>;
  subscription: Subscription;
  
  company: Company;
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
    this.subscription = this.companyService.company$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    if (this.company.id) {
      let newCompany = JSON.parse(JSON.stringify(this.company))//remove all null values from object
      this.companyService.update(this.company.id, newCompany)
        .then(() => {
          this.message = "Customer Limit changed successfully"
        })
        .catch((error) => {
          this.errorMessage = "Customer Limit changing failed! ", error;
          console.log("Customer Limit changing failed! ", error);
        });
      this.clear();
    }
  }

  clear() {
    this.message = '';
    this.errorMessage = '';
    this.company = new Company();
  }

}
