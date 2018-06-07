import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from 'app/store';
import * as customerActions from '../actions/customers.action';
import { CustomerService } from 'shared/services/customer.service';

@Injectable()
export class CustomersEffects {
  companyId;
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  @Effect()
  loadCustomers$ = this.actions$.ofType(customerActions.LOAD_CUSTOMERS).pipe(
    switchMap(() => {
      return this.customerService.getAll(this.companyId).pipe(
        map(customers => new customerActions.LoadCustomersSuccess(customers)),
        catchError(error => of(new customerActions.LoadCustomersFail(error)))
      );
    })
  );

  @Effect()
  createCustomer$ = this.actions$.ofType(customerActions.CREATE_CUSTOMER).pipe(
    map((action: customerActions.CreateCustomer) => action.payload),
    switchMap(customer => {
      return this.customerService
        .create(customer)
        .then(ref => new customerActions.CreateCustomerSuccess(ref))
        .catch(error => of(new customerActions.CreateCustomerFail(error)));
    })
  );

  @Effect()
  createCustomerSuccess$ = this.actions$
    .ofType(customerActions.CREATE_CUSTOMER_SUCCESS)
    .pipe(
      map((action: customerActions.CreateCustomerSuccess) => action.payload),
      map(customer => {
        return new fromRoot.Go({
          path: ['/customers/details/', customer.id]
        });
      })
    );

  @Effect()
  updateCustomer$ = this.actions$.ofType(customerActions.UPDATE_CUSTOMER).pipe(
    map((action: customerActions.UpdateCustomer) => action.payload),
    switchMap(customer => {
      return this.customerService
        .update(customer.id, customer)
        .then(ref => new customerActions.UpdateCustomerSuccess(customer))
        .catch(error => of(new customerActions.CreateCustomerFail(error)));
    })
  );

  @Effect()
  removeCustomer$ = this.actions$.ofType(customerActions.REMOVE_CUSTOMER).pipe(
    map((action: customerActions.RemoveCustomer) => action.payload),
    switchMap(customer => {
      return this.customerService
        .delete(customer.id)
        .then(ref => new customerActions.RemoveCustomerSuccess(customer))
        .catch(error => new customerActions.RemoveCustomerFail(error));
    })
  );

  @Effect()
  handleCustomerSuccess$ = this.actions$
    .ofType(
      customerActions.UPDATE_CUSTOMER_SUCCESS,
      customerActions.REMOVE_CUSTOMER_SUCCESS
    )
    .pipe(
      map(customer => {
        return new fromRoot.Go({
          path: ['/customers']
        });
      })
    );
}
