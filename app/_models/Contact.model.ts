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
    maritalStatus: number;

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
        this.maritalStatus = 0;
    }
}
