export class ContactAdditionalInformation {
    ID: number;
    id_contact: number;
    licence: number;
    car: number;
    licence_kind: number;
    officeLevel: number;
    dependents: string;

    constructor() {
        this.ID = 0;
        this.id_contact = 0;
        this.licence = 0;
        this.car = 0;
        this.licence_kind = 0;
        this.officeLevel = 0;
        this.dependents = '';
    }
}