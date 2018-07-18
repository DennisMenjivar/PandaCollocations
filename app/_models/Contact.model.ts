export class Contact {
    ID: number;
    id_company: number;
    identity: string;
    firstName: string;
    lastName: string;
    gender: number;
    birthday: Date;
    nationality: number;
    photoString: string;
    profession: string;
    maritalStatus: number;
    status: number;
    status_name: string;
    paid: number;
    country: string;
    registerUser: string;

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

    licence: number;
    car: number;
    licence_kind: number;
    officeLevel: number;
    dependents: string;

    constructor(id_company: number) {
        this.ID = 0;
        this.id_company = id_company;
        this.identity = '';
        this.firstName = '';
        this.lastName = '';
        this.gender = 0;
        this.birthday = new Date();
        this.nationality = 0;
        this.photoString = '';
        this.profession = '';
        this.maritalStatus = 0;
        this.status = 0;
        this.status_name = '';
        this.paid = 0;
        this.country = '';
        this.registerUser = '';

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

        this.licence = 0;
        this.car = 0;
        this.licence_kind = 0;
        this.officeLevel = 0;
        this.dependents = '';
    }
}
