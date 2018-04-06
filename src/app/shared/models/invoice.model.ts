import { Customer } from './customer.model';
import { InvoiceItems } from './invoice-items.model';

export class Invoice {
    constructor(
        public id?: number,
        public companyId?: string,
        public date?: Date,
        public customerId?: string,
        public previousDue?: number,
        public due?: number,
        public total?: number,
        public deposit?: number,
        public discount?: number,
        public explanation?: string,
        // public inWords?: string,
        ) { }

}
