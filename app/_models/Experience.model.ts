export class Experience {
    ID: number;
    id_contact: number;
    id_company: number;
    company: string;
    salary: number;
    functions: string;
    fromString: Date;
    until: Date;

    constructor() {
        this.ID = 0;
        this.id_contact = 0;
        this.id_company = 0;
        this.company = '';
        this.salary = 0;
        this.functions = '';
        this.fromString = new Date();
        this.until = new Date();
    }
}