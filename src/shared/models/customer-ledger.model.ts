
export class CustomerLedger {
    constructor(
        public id?: string,
        public createdDate?: Date,
        public createdBy?: string,
        public customerId?: string,
        public date?: Date,
        public explanation?: string,
        public ref?: number,
        public debit?: number,
        public credit?: number,
        public balance?: number,
    ) { }
}
