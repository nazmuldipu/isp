import 'rxjs/add/operator/map';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';
import { Store } from 'store';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers$: Observable<Customer[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private customerService: CustomerService,
  ) { }

  async ngOnInit() {
    this.customers$ = this.store.select<Customer[]>('customer')
      .map(cus => {
        return (cus ? cus.filter(c => c.active === true) : null);
      });
    this.subscription = this.customerService.customers$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showImage(id: string) {
    this.router.navigate(['/dashboard/customer/customer-images', id]);
  }

  deactivate(customer: Customer) {
    customer.active = false;
    this.customerService.update(customer.id, customer).then(() => console.log('Customer deactivated'));
  }

}
