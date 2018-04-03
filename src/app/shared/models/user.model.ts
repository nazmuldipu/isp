export class User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    password: string;
    companyId: string;

    constructor(
        $key?: string,
        name?: string,
        email?: string,
        roles?: string[],
        password?: string,
        companyId?: string
    ){}

}