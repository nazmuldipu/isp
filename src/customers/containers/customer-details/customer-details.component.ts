import 'rxjs/add/operator/map';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';
import { Store } from 'store';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  id;
  customer: Customer;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    if (this.id) {
      this.subscriptions.push(
        await this.store
          .select<Customer[]>('customer')
          .map(cus => {
            return cus ? cus.find(c => c.id === this.id) : null;
          })
          .subscribe(data => {
            this.customer = data as Customer;
          })
      );
      this.subscriptions.push(this.customerService.customers$.subscribe());
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
