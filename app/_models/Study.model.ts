export class Study {
    ID: number;
    id_contact: number;
    description: string;
    institute: string;
    kind: number;

    constructor() {
        this.ID = 0;
        this.id_contact = 0;
        this.description = '';
        this.institute = '';
        this.kind = 0;
    }
}