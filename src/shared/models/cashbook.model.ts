export class Cashbook {
    constructor(
        public id?: string,
        public createdDate?: Date,
        public createdBy?: string,
        public date?: Date,
        public companyId?: string,
        public explanation?: string,
        public ref?: number,
        public debit?: number,
        public credit?: number,
        public balance?: number,
 
        ) { }
}