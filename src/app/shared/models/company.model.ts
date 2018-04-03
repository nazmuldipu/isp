export class Company {
    constructor(
        public id?: string,
        public companyName?: string,
        public companyNameBangla?: string,
        public companyAddress?: string,
        public contactPerson?: string,
        public telephone?: string,
        public webAddress?: string,
        public maximumNumberOfCustomer?: number,
        public smsQuota?: number,
        public perMonthValue?: number,
        public balance?: number
        ) { }

}
