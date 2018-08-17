export class Resume {
    ID: number;
    identityString: string;
    name: string;
    pdfLink: string;
    city: string;
    yearsOld: number;
    status_name: string;
    gender: string;
    profession: string;
    interestArea: string;

    constructor() {
        this.ID = 0;
        this.identityString = '';
        this.name = '';
        this.pdfLink = '';
        this.city = '';
        this.yearsOld = 0;
        this.status_name = '';
        this.gender = '';
        this.profession = '';
        this.interestArea = '';
    }
}