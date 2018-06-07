import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import { Customer } from 'shared/models/customer.model';

@Injectable()
export class CustomerExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.customerId;
        return this.hasCustomer(id);
      })
    );
  }

  hasCustomer(id: string): Observable<boolean> {
    return this.store.select(fromStore.getCustomersEntities).pipe(
      map((entities: { [key: string]: Customer }) => !!entities[id]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getCustomerLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadCustomers());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
