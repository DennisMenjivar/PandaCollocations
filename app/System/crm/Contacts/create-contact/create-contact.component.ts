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

  title: string = 'Crear Contacto';

  myContact: Contact;

  id_company: number = 0;

  gender = [{ value: 0, viewValue: 'Hombre' }, { value: 1, viewValue: 'Mujer' }];
  nationality = [{ value: 0, viewValue: 'Honduras' }, { value: 1, viewValue: 'Extranjero' }];
  maritalStatus = [{ value: 0, viewValue: 'Soltero' }, { value: 1, viewValue: 'Casado' }, { value: 2, viewValue: 'Unión libre' }];
  status = [{ value: 0, viewValue: 'Pendiente' }, { value: 1, viewValue: 'Aprobado' }, { value: 2, viewValue: 'Contratado' }];
  academyLevel = [{ value: 0, viewValue: 'Primaria' }, { value: 1, viewValue: 'Secundaria' }, { value: 2, viewValue: 'Universitaria' }, { value: 3, viewValue: 'Doctorado' }];
  schedulesAvailable = [{ value: 0, viewValue: 'SI' }, { value: 1, viewValue: 'NO' }];
  states = [{ value: 0, viewValue: 'Cortes' }, { value: 1, viewValue: 'Atlántida' }, { value: 2, viewValue: 'Choluteca' }];

  categories: Category[];
  categorySelected: Category = new Category();
  subCategories: SubCategory[];

  constructor(public router: Router, public _auxiliar: ColocationService) {
    this.getCategories();
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
      this.myContact = new Contact(this.id_company);
    }
    if (_auxiliar.myContact != null) {
      this.myContact = _auxiliar.myContact;
      this.title = this.myContact.firstName + ' ' + this.myContact.lastName;
    }
  }

  getCategories() {
    this.categories = [];
    this._auxiliar.getCategories().subscribe(data => {
      this.categories = data;
      this.getSubCategories();
    });
  }

  getSubCategories() {
    this.myContact.interstArea = 0;
    this.subCategories = [];
    this._auxiliar.getSubCategories(this.categorySelected).subscribe(result => {
      this.subCategories = result;
      // Cargo el detalle despues de haberse cargado las subcategorias
      if (this.myContact.ID != 0) {
        this._auxiliar.getContactInformation(this.myContact).subscribe(data => {
          this._auxiliar.myContact.email = data.email;
          this._auxiliar.myContact.address = data.address;
          this._auxiliar.myContact.telephoneNumberPrimary = data.telephoneNumberPrimary;
          this._auxiliar.myContact.telephoneNumberSecondary = data.telephoneNumberSecondary;
          this._auxiliar.myContact.academyLevel = data.academyLevel;
          this._auxiliar.myContact.level = data.level;
          this._auxiliar.myContact.interstArea = data.interstArea;
          this._auxiliar.myContact.schedulesAvailable = data.schedulesAvailable;
          this._auxiliar.myContact.travelAvailable = data.travelAvailable;
          this._auxiliar.myContact.wageAspiration = data.wageAspiration;
          this._auxiliar.myContact.negotiable = data.negotiable;
          this._auxiliar.myContact.city = data.city;
          this._auxiliar.myContact.state = data.state;
          this._auxiliar.myContact.address = data.address;
        });
      }
    })
  }

  createContact() {
    this.myContact.registerUser = JSON.parse(sessionStorage.getItem('currentUser')).username;
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
