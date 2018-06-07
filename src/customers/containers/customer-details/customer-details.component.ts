import 'rxjs/add/operator/map';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from 'shared/models/customer.model';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer$: Observable<Customer>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  async ngOnInit() {
    this.customer$ = this.store.select(fromStore.getSelectedCustomer);
  }
}
