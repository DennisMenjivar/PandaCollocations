export class Email {
    name: string;
    email: string;
    password: string;
    from: string;
    to: string;
    toName: string;
    subject: string;
    body: string;
    CC: string;
    SmtpClient: string;
    port: number;

    constructor() {
        this.name = '';
        this.email = '';
        this.password = '';
        this.from = '';
        this.to = '';
        this.subject = '';
        this.body = '';
        this.CC = '';
        this.SmtpClient = '';
        this.port = 0;
    }
}