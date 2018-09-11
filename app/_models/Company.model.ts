export class Company {
    ID: number;
    name: string;
    email: string;
    telephoneNumber: string;
    photoString: string;
    status: number;

    constructor(ID: number) {
        this.ID = ID;
        this.name = '';
        this.email = '';
        this.telephoneNumber = '';
        this.photoString = '';
        this.status = 0;
    }
}