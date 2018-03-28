export class User {
    $key: string;
    name: string;
    email: string;
    roles: string[];
    password: string;

    constructor(
        $key?: string,
        name?: string,
        email?: string,
        roles?: string[],
        password?: string,
    ){}

}