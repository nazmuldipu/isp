import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as fromStore from '../../store';

import { Customer } from 'shared/models/customer.model';

@Component({
  selector: 'app-inactive-customer-list',
  templateUrl: './inactive-customer-list.component.html',
  styleUrls: ['./inactive-customer-list.component.scss']
})
export class InactiveCustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(
    private router: Router,
    private store: Store<fromStore.ProductsState>
  ) {}

  async ngOnInit() {
    this.customers$ = this.store.select(fromStore.getAllInactiveCustomer);
  }

  showImage(id: string) {
    this.router.navigate(['/dashboard/customer/customer-images', id]);
  }

  activate(customer: Customer) {
    const value = {
      ...customer,
      active: true
    };
    this.store.dispatch(new fromStore.UpdateCustomer(value));
  }
}
