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
    profession: number;
    profession_name: string;
    maritalStatus: number;
    status: number;
    status_name: string;
    paid: number;

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
        this.profession = 0;
        this.profession_name = '';
        this.maritalStatus = 0;
        this.status = 0;
        this.status_name = '';
        this.paid = 0;
    }
}
