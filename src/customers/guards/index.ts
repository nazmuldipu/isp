import { CustomersGuard } from './customers.guard';
import { CustomerExistsGuard } from './customer-exists.guard';

export const guards: any[] = [CustomersGuard, CustomerExistsGuard];

export * from './customers.guard';
export * from './customer-exists.guard';
