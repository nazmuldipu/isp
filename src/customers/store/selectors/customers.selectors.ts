import { createSelector } from '@ngrx/store';

import * as fromRooot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromCustomer from '../reducers/customers.reducer';

import { Customer } from 'shared/models/customer.model';

export const getCustomersState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.customers
);

export const getCustomersEntities = createSelector(
  getCustomersState,
  fromCustomer.getCustomersEntities
);

export const getSelectedCustomer = createSelector(
  getCustomersEntities,
  fromRooot.getRouterState,
  (entities, router): Customer => {
    return router.state && entities[router.state.params.customerId];
  }
);

export const getAllCustomer = createSelector(getCustomersEntities, entites => {
  return Object.keys(entites).map(id => entites[id]);
});

export const getAllActiveCustomer = createSelector(
  getCustomersEntities,
  entites => {
    return Object.keys(entites)
      .filter(cus => entites[cus].active === true)
      .map(id => entites[id]);
  }
);

export const getAllInactiveCustomer = createSelector(
  getCustomersEntities,
  entites => {
    return Object.keys(entites)
      .filter(cus => entites[cus].active === false)
      .map(id => entites[id]);
  }
);

export const getCustomerLoaded = createSelector(
  getCustomersState,
  fromCustomer.getCustomersLoaded
);

export const getCustomerLoading = createSelector(
  getCustomersState,
  fromCustomer.getCustomersLoading
);
