import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../_models/Contact.model';
import { Router } from '@angular/router';
import { ColocationService } from '../../../../_lib/colocation.service';
import { MatDialog } from '@angular/material';
import { Email } from '../../../../_models/Email.model';

@Component({
  selector: 'app-send-resumes',
  templateUrl: './send-resumes.component.html',
  styleUrls: ['./send-resumes.component.scss']
})
export class SendResumesComponent implements OnInit {

  id_company: number = 0;
  myEmail: Email;

  title: string = '';

  sayHello: string = '';
  footer: string = '';

  constructor(public router: Router, public _auxiliar: ColocationService, public dialog: MatDialog) {
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
      this.myEmail = new Email();
    }
    if (_auxiliar.myEmail != null) {
      this.myEmail = _auxiliar.myEmail;
      this.title = this.myEmail.subject;
    }
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/ope/resumes', this.id_company]);
    this._auxiliar.myEmail = null;
  }

  sendEmail() {
    this.myEmail.body += '\n' + this.footer;
    let body = this.myEmail.body;
    this.myEmail.body = this.sayHello + '\n\n' + body;
    console.log("Email: ", this.myEmail);

    this._auxiliar.sendEmail(this.myEmail).subscribe(result => {
      this.goBack();
    });
  }

}
