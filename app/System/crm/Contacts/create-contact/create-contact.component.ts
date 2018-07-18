import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../_models/Contact.model';
import { Router } from '@angular/router';
import { ColocationService } from '../../../../_lib/colocation.service';
import { ContactInformation } from '../../../../_models/ContactInformation.model';
import { ContactAdditionalInformation } from '../../../../_models/ContactAdditionalInformation.model';
import { Category } from '../../../../_models/Category.model';
import { SubCategory } from '../../../../_models/SubCategory.model';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  myContact: Contact;
  myContactInformation: ContactInformation;
  myContactAdditionalInformation: ContactAdditionalInformation;

  id_company: number = 0;

  gender = [{ value: 0, viewValue: 'Hombre' }, { value: 1, viewValue: 'Mujer' }];
  nationality = [{ value: 0, viewValue: 'Honduras' }, { value: 1, viewValue: 'Guatemala' }];
  maritalStatus = [{ value: 0, viewValue: 'Soltero' }, { value: 1, viewValue: 'Casado' }, { value: 2, viewValue: 'Unión libre' }];
  status = [{ value: 0, viewValue: 'Pendiente' }, { value: 1, viewValue: 'Aprobado' }, { value: 2, viewValue: 'Contratado' }];
  academyLevel = [{ value: 0, viewValue: 'Primaria' }, { value: 1, viewValue: 'Secundaria' }, { value: 2, viewValue: 'Universitaria' }, { value: 3, viewValue: 'Doctorado' }];

  categories: Category[];
  categorySelected: Category = new Category();
  subCategories: SubCategory[];

  constructor(public router: Router, public _auxiliar: ColocationService) {
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
      this.myContact = new Contact(this.id_company);
      this.myContactInformation = this.myContact.contactInformation;
      this.myContactAdditionalInformation = this.myContact.contactAdditionalInformation;
    }
    if (_auxiliar.myContact != null) {
      this.myContact = _auxiliar.myContact;
    }
    this.getCategories();
  }

  getCategories() {
    this.categories = [];
    this._auxiliar.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getSubCategories() {
    this.myContactInformation.interstArea = 0;
    this.subCategories = [];
    this._auxiliar.getSubCategories(this.categorySelected).subscribe(result => {
      this.subCategories = result;
    })
  }

  createContact() {
    this._auxiliar.setContact(this.myContact).subscribe(data => {
      this.goBack();
    });
  }

  goBack() {
    this.router.navigate(['/crm/contactos', this.id_company]);
    this._auxiliar.myContact = null;
  }

  ngOnInit() {
  }
}
