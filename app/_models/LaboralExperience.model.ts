export class LaboralExperience {
    ID: number;
    id_contact: number;
    company: string;
    salary: number;
    position: string;
    functions: string;
    fromString: Date;
    until: Date;

    constructor() {
        this.ID = 0;
        this.id_contact = 0;
        this.company = '';
        this.salary = 0;
        this.position = '';
        this.functions = '';
        this.fromString = new Date();
        this.until = new Date();
    }
}