import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../_models/Contact.model';
import { Router } from '@angular/router';
import { ColocationService } from '../../../../_lib/colocation.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  myContact: Contact;
  id_company: number = 0;

  gender = [{ value: 0, viewValue: 'Hombre' }, { value: 1, viewValue: 'Mujer' }];
  nationality = [{ value: 0, viewValue: 'Honduras' }, { value: 1, viewValue: 'Guatemala' }];
  maritalStatus = [{ value: 0, viewValue: 'Soltero' }, { value: 1, viewValue: 'Casado' }, { value: 2, viewValue: 'Unión libre' }];
  status = [{ value: 0, viewValue: 'Pendiente' }, { value: 1, viewValue: 'Aprobado' }, { value: 2, viewValue: 'Contratado' }];

  constructor(public router: Router, public _auxiliar: ColocationService, ) {
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
      this.myContact = new Contact(this.id_company);
    }
    if (_auxiliar.myContact != null) {
      this.myContact = _auxiliar.myContact;
    }
  }

  createContact() {
    this._auxiliar.setContact(this.myContact).subscribe(data => {
      this.goBack();
    });
  }

  goBack() {
    this.router.navigate(['/crm/contactos', this.id_company])
  }

  ngOnInit() {
  }
}
