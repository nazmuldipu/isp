import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Company } from 'shared/models/company.model';
import { Customer } from 'shared/models/customer.model';
import { CompanyService } from 'shared/services/company.service';
import { CustomerService } from 'shared/services/customer.service';
import { Store } from 'store';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  customers$: Observable<Customer[]>;
  subscriptions: Subscription[] = [];

  companyId;
  company: Company;
  customers: Customer[] = [];

  constructor(
    private store: Store,
    private customerService: CustomerService,
    private companyService: CompanyService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    this.customers$ = this.store.select<Customer[]>('customer');
    this.subscriptions = [
      this.customerService.customers$.subscribe(),
      this.companyService.get(this.companyId).subscribe(data => this.company = data),
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
