export class ContactInformation {
    ID: number;
    id_contact: number;
    email: string;
    telephoneNumberPrimary: string;
    telephoneNumberSecondary: string;
    academyLevel: number;
    level: string;
    interstArea: number;
    schedulesAvailable: number;
    travelAvailable: number;
    wageAspiration: number;
    negotiable: number;
    city: string;
    state: number;
    address: string;

    constructor() {
        this.ID = 0;
        this.id_contact = 0;
        this.email = '';
        this.telephoneNumberPrimary = '';
        this.telephoneNumberSecondary = '';
        this.academyLevel = 0;
        this.level = '';
        this.interstArea = 0;
        this.schedulesAvailable = 0;
        this.travelAvailable = 0;
        this.wageAspiration = 0;
        this.negotiable = 0;
        this.city = '';
        this.state = 0;
        this.address = '';
    }
}