import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCustomers from './customers.reducer';

export interface ProductsState {
  customers: fromCustomers.CustomerState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  customers: fromCustomers.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'customers'
);
