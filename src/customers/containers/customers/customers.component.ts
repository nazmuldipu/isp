import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Customer } from 'shared/models/customer.model';

import * as fromStore from '../../store';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(
    private router: Router,
    private store: Store<fromStore.ProductsState>
  ) {}

  async ngOnInit() {
    this.customers$ = this.store.select(fromStore.getAllActiveCustomer);
  }

  showImage(id: string) {
    this.router.navigate(['customers/images', id]);
  }

  deactivate(customer: Customer) {
    const value = {
      ...customer,
      active: false
    };
    this.store.dispatch(new fromStore.UpdateCustomer(value));
  }
}
