export class SMS {
    constructor(
        public id?: string,
        public createdDate?: Date,
        public createdBy?: string,
        public date?: Date,
        public companyId?: string,
        public userId?: string,
        public phone?: string,
        public message?: string,
        public notes?: string,
    ) { }
}
