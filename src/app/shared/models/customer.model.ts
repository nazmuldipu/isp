import { Address } from './address.model';


export class Customer {
    constructor(

        public id?: string,
        public createdDate?: Date,
        public companyId?: string,
        public createdBy?: string,
        public date?: Date,
        public name?: string,
        public imageUrl?: string,
        public fathersName?: string,
        public mothersName?: string,
        public gender?: string,
        public phone?: string,
        public email?: string,
        public dob?: Date,
        public occupation?: string,
        public zone?: string,
        public prAddress?: Address,
        public perAddress?: string,
        public idType?: string,
        public otherIdType?: string,
        public idNumber?: string,
        public reference?: string,
        public connectionDate?: Date,
        public connectionFee?: number,
        public monthlyBill?: number,
        public balance?: number,
        public due?: number,
        public dateOfPayment?: string,

        public popLocation?: string,
        public boxName?: string,
        public installedBy?: string,
        public useCable?: string,
        public bandwidthType?: string,
        public userType?: string,
        public packageType?: string,

        public userName?: string,
        public password?: string,
        public ipAddress?: string,
        public gateway?: string,
        public subnet?: string,
        public active?: boolean,
        public idImagesUrl1?: string,
        public idImagesUrl2?: string,
        ) { }

}
