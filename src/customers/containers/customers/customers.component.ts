import 'rxjs/add/operator/map';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  customers$: Observable<Customer[]>;
  subscription: Subscription;

  customers: Customer[];
  companyId;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    this.subscription = await this.customerService
      .getActiveCustomers(this.companyId)
      .subscribe(
        data => {
          this.customers = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showImage(id: string) {
    this.router.navigate(['customers/images', id]);
  }

  deactivate(customer: Customer) {
    customer.active = false;
    this.customerService
      .update(customer.id, customer)
      .then(() => console.log('Customer deactivated'));
  }
}
