import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColocationService } from '../../_lib/colocation.service';
import { Company } from '../../_models/Company.model';
import { Contact } from '../../_models/Contact.model';
import { Category } from '../../_models/Category.model';
import { SubCategory } from '../../_models/SubCategory.model';
import { Study } from '../../_models/Study.model';

@Component({
  selector: 'app-register-cmp',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {
  test: Date = new Date();

  title: string = ' ';
  myCompany: Company;
  myContact: Contact;

  private sub: any;
  id: number;

  gender = [{ value: 0, viewValue: 'Hombre' }, { value: 1, viewValue: 'Mujer' }];
  nationality = [{ value: 0, viewValue: 'Honduras' }, { value: 1, viewValue: 'Extranjero' }];
  maritalStatus = [{ value: 0, viewValue: 'Soltero' }, { value: 1, viewValue: 'Casado' }, { value: 2, viewValue: 'Unión libre' }];
  status = [{ value: 0, viewValue: 'Pendiente' }, { value: 1, viewValue: 'Aprobado' }, { value: 2, viewValue: 'Contratado' }];
  academyLevel = [{ value: 0, viewValue: 'Primaria' }, { value: 1, viewValue: 'Secundaria' }, { value: 2, viewValue: 'Universitaria' }, { value: 3, viewValue: 'Doctorado' }];
  schedulesAvailable = [{ value: 0, viewValue: 'SI' }, { value: 1, viewValue: 'NO' }];
  states = [{ value: 0, viewValue: 'Cortes' }, { value: 1, viewValue: 'Atlántida' }, { value: 2, viewValue: 'Choluteca' }];
  vehicles = [{ value: 0, viewValue: 'NO' }, { value: 1, viewValue: 'Automovil' }, { value: 2, viewValue: 'Motocicleta' }];
  licence_kind = [{ value: 0, viewValue: 'Liviana' }, { value: 1, viewValue: 'Pesada' }, { value: 2, viewValue: 'Motocicleta' }];
  kinds = [{ value: 0, viewValue: 'Estudio' }, { value: 1, viewValue: 'Curso' }];

  categories: Category[];
  categorySelected: Category = new Category();
  subCategories: SubCategory[];
  studies: Study[];

  constructor(private route: ActivatedRoute, public _auxiliar: ColocationService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getCompany();
      this.myContact = new Contact(this.id);
    });
  }

  getCompany() {
    let company: Company = new Company(this.id);
    this._auxiliar.getCompany(company).subscribe(result => {
      this.title += result.name;
      this.myCompany = result;
      this.getCategories();
    })
  }

  condition(): boolean {
    if (this.myContact.identity == '') {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese la Identidad..');
      return false;
    } else if (this.myContact.firstName == '') {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese el Primer nombre..');
      return false;
    } else if (this.myContact.lastName == '') {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese el Segundo nombre..');
      return false;
    } else if (this.myContact.email == '') {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese el Correo electronico..');
      return false;
    } else if (this.myContact.telephoneNumberPrimary == '') {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese el Telefono..');
      return false;
    } else if (this.myContact.city == '') {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese la Ciudad.');
      return false;
    } else if (this.myContact.address == '') {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese la Dirección.');
      return false;
    } else if (this.myContact.profession == '') {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese la Profesión.');
      return false;
    } else if (this.myContact.interstArea == 0) {
      this._auxiliar.showSwal('error', 'Error', 'Por favor, Ingrese el Area de interes.');
      return false;
    }
    this._auxiliar.showSwal('success-message', 'Exito', 'Se a registrado correctamente');
    return true;
  }

  createContact() {
    if (this.condition()) {
      this._auxiliar.setContact(this.myContact).subscribe(result => {
        this.myContact.ID = result;
        // INSERTO LA IMAGEN
        this.setImage(result.toString() + ".jpg", this.myContact);
        this.imageName = '../../assets/img/image_placeholder.jpg';
        this.myContact = new Contact(this.id);
      });
    }
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }

  getCategories() {
    this.categories = [];
    this._auxiliar.getCategories().subscribe(data => {
      this.categories = data;
      this.getSubCategories();
    });
  }

  getSubCategories() {
    this.subCategories = [];
    this._auxiliar.getSubCategories(this.categorySelected).subscribe(result => {
      this.subCategories = result;
    });
  }

  imageName: string = '../../assets/img/image_placeholder.jpg';
  formData: FormData = new FormData();
  file: File;
  getFile(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.name = this.path + this.file.name;
      this.isUploadBtn = true;
    }
  }

  setImage(fileName: string, contact: Contact) {
    this.formData.append('uploadFile', this.file, fileName);
    this._auxiliar.setImage(this.formData, contact)
  }

  isUploadBtn: boolean;
  name: string;
  path: string = "http:/collocationsapi.colocacioneshonduras.com/Photos/contacts/";
}
