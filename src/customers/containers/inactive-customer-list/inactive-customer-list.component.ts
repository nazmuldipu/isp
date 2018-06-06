import 'rxjs/add/operator/map';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';

@Component({
  selector: 'app-inactive-customer-list',
  templateUrl: './inactive-customer-list.component.html',
  styleUrls: ['./inactive-customer-list.component.scss']
})
export class InactiveCustomerListComponent implements OnInit, OnDestroy {
  // customers$: Observable<Customer[]>;
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
      .getInactiveCustomers(this.companyId)
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
    this.router.navigate(['/dashboard/customer/customer-images', id]);
  }

  activate(customer: Customer) {
    customer.active = true;
    this.customerService
      .update(customer.id, customer)
      .then(() => console.log('Customer activated'));
  }
}
