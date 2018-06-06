import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Company } from 'shared/models/company.model';
import { Customer } from 'shared/models/customer.model';
import { CompanyService } from 'shared/services/company.service';
import { CustomerService } from 'shared/services/customer.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  customers$: Observable<Customer[]>;
  subscription: Subscription;

  companyId;
  company: Company;
  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private companyService: CompanyService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    this.subscription = await this.customerService
      .getAll(this.companyId)
      .subscribe(
        data => {
          this.customers = data;
        },
        error => console.log(error)
      );

    this.subscription = await this.companyService
      .get(this.companyId)
      .subscribe(data => (this.company = data as Company));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
