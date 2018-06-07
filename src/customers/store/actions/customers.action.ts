import { Action } from '@ngrx/store';
import { Customer } from 'shared/models/customer.model';

// Load Customers
export const LOAD_CUSTOMERS = '[Products] Load Customers';
export const LOAD_CUSTOMERS_FAIL = '[Products] Load Customers fail';
export const LOAD_CUSTOMERS_SUCCESS = '[Products] Load Customers Success';

export class LoadCustomers implements Action {
  readonly type = LOAD_CUSTOMERS;
}

export class LoadCustomersFail implements Action {
  readonly type = LOAD_CUSTOMERS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCustomersSuccess implements Action {
  readonly type = LOAD_CUSTOMERS_SUCCESS;
  constructor(public payload: Customer[]) {}
}

// Create Customer
export const CREATE_CUSTOMER = '[Products] Create Customer';
export const CREATE_CUSTOMER_FAIL = '[Products] Create Customer fail';
export const CREATE_CUSTOMER_SUCCESS = '[Products] Create Customer Success';

export class CreateCustomer implements Action {
  readonly type = CREATE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class CreateCustomerFail implements Action {
  readonly type = CREATE_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class CreateCustomerSuccess implements Action {
  readonly type = CREATE_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

// Update Customer
export const UPDATE_CUSTOMER = '[Products] Update Customer';
export const UPDATE_CUSTOMER_FAIL = '[Products] Update Customer fail';
export const UPDATE_CUSTOMER_SUCCESS = '[Products] Update Customer Success';

export class UpdateCustomer implements Action {
  readonly type = UPDATE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class UpdateCustomerFail implements Action {
  readonly type = UPDATE_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCustomerSuccess implements Action {
  readonly type = UPDATE_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

// Remove Customer
export const REMOVE_CUSTOMER = '[Products] Remove Customer';
export const REMOVE_CUSTOMER_FAIL = '[Products] Remove Customer fail';
export const REMOVE_CUSTOMER_SUCCESS = '[Products] Remove Customer Success';

export class RemoveCustomer implements Action {
  readonly type = REMOVE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class RemoveCustomerFail implements Action {
  readonly type = REMOVE_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class RemoveCustomerSuccess implements Action {
  readonly type = REMOVE_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

// action types
export type CustomerAction =
  | LoadCustomers
  | LoadCustomersFail
  | LoadCustomersSuccess
  | CreateCustomer
  | CreateCustomerFail
  | CreateCustomerSuccess
  | UpdateCustomer
  | UpdateCustomerFail
  | UpdateCustomerSuccess
  | RemoveCustomer
  | RemoveCustomerFail
  | RemoveCustomerSuccess;
