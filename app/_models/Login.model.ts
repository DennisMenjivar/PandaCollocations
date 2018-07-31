export class Login {
    username: string;
    password: string;
    id_company: number;
    company_name: string;
    photoString_company: string;
    photoString: string;
    telephoneNumber: string;
    name_user: string;
    kind: number;
    conectado: number;
    membership: number;

    constructor(pUsername: string, pPassword: string) {
        this.username = pUsername;
        this.password = pPassword;
        this.id_company = 0;
        this.company_name = '';
        this.photoString_company = '';
        this.photoString = '';
        this.telephoneNumber = '';
        this.name_user = '';
        this.kind = -1;
        this.conectado = -1;
        this.membership = 0;
    }
}