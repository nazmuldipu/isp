import * as fromCustomers from '../actions/customers.action';
import { Customer } from 'shared/models/customer.model';

export interface CustomerState {
  entities: { [id: number]: Customer };
  loaded: boolean;
  loading: boolean;
}

export const initialState: CustomerState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromCustomers.CustomerAction
): CustomerState {
  switch (action.type) {
    case fromCustomers.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromCustomers.LOAD_CUSTOMERS_SUCCESS: {
      const customers = action.payload;
      const entities = customers.reduce(
        (entities: { [id: number]: Customer }, customer: Customer) => {
          return {
            ...entities,
            [customer.id]: customer
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromCustomers.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromCustomers.UPDATE_CUSTOMER_SUCCESS:
    case fromCustomers.CREATE_CUSTOMER_SUCCESS: {
      const customer = action.payload;
      const entities = {
        ...state.entities,
        [customer.id]: customer
      };

      return {
        ...state,
        entities
      };
    }

    case fromCustomers.REMOVE_CUSTOMER_SUCCESS: {
      const customer = action.payload;
      const { [customer.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getCustomersEntities = (state: CustomerState) => state.entities;
export const getCustomersLoading = (state: CustomerState) => state.loading;
export const getCustomersLoaded = (state: CustomerState) => state.loaded;
