import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../_models/Contact.model';
import { Router } from '@angular/router';
import { ColocationService } from '../../../../_lib/colocation.service';
import { Category } from '../../../../_models/Category.model';
import { SubCategory } from '../../../../_models/SubCategory.model';
import { MatDialog } from '@angular/material';
import { ExperienceEditDialogComponent } from '../experience-edit-dialog/experience-edit-dialog.component';
import { MatPaginator, MatTableDataSource, DateAdapter } from '@angular/material';
import { LaboralExperience } from '../../../../_models/LaboralExperience.model';
import { Language } from '../../../../_models/Language.model';
import { LanguageEditDialogComponent } from '../language-edit-dialog/language-edit-dialog.component';
import { Study } from '../../../../_models/Study.model';
import { StudyEditDialogComponent } from '../study-edit-dialog/study-edit-dialog.component';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  title: string = 'Crear Contacto';

  dataSource = new MatTableDataSource<LaboralExperience>();
  displayedColumns = ['Company', 'position', 'functions', 'salary', 'fromString', 'until', 'editar'];

  dataSourceLanguages = new MatTableDataSource<Language>();
  displayedColumnsLanguages = ['Lenguaje', 'Nivel', 'editar'];

  dataSourceStudies = new MatTableDataSource<Study>();
  displayedColumnsStudies = ['study', 'institute', 'kind', 'editar'];

  myContact: Contact;

  id_company: number = 0;

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

  constructor(public router: Router, public _auxiliar: ColocationService, public dialog: MatDialog) {
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
      this.myContact = new Contact(this.id_company);
    }
    if (_auxiliar.myContact != null) {
      this.myContact = _auxiliar.myContact;
      this.title = this.myContact.firstName + ' ' + this.myContact.lastName;
      this.getContactInformation();
    }
  }

  getContactInformation() {
    if (this.myContact.ID != 0) {
      this.imageName = 'http://collocationsapi.colocacioneshonduras.com/photos/Contacts/' + this.myContact.ID + '.jpg';
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
        this.getContactAdditionalInformation();
      });
    }
  }

  getContactAdditionalInformation() {
    this._auxiliar.getContactAdditionalInformation(this.myContact).subscribe(result => {
      this.myContact.licence = result.licence;
      this.myContact.car = result.car;
      this.myContact.licence_kind = result.licence_kind;
      this.myContact.officeLevel = result.officeLevel;
      this.myContact.dependents = result.dependents;
      this.getLaboralExperiences();
    })
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

  createContact() {
    this.myContact.registerUser = JSON.parse(sessionStorage.getItem('currentUser')).username;
    this.myContact.company_name = JSON.parse(sessionStorage.getItem('currentUser')).company_name;
    this.myContact.photoString_company = 'C:\\inetpub\\wwwroot\\CollocationsApi\\Photos\\Companies\\' + this.myContact.company_name + '.jpg';

    this._auxiliar.setContact(this.myContact).subscribe(data => {
      this.myContact.ID = data;
      this.title = this.myContact.firstName + " " + this.myContact.lastName;
      // INSERTO LA IMAGEN
      this.setImage(data.toString() + ".jpg", this.myContact);
    }, error => {
      console.log("Error al guardar: ", error);
    });
  }

  goBack() {
    this.imageName = null;
    this.router.navigate(['/crm/contactos', this.id_company]);
    this._auxiliar.myContact = null;
  }

  ngOnInit() {
    this.getCategories();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ExperienceEditDialogComponent, {
      width: '500px',
      data: {
        myContact: this.myContact
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getLaboralExperiences();
      }
    });
  }

  editLaboralExperience(experience: LaboralExperience) {
    let dialogRef = this.dialog.open(ExperienceEditDialogComponent, {
      width: '500px',
      data: {
        myContact: this.myContact,
        experience: experience
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getLaboralExperiences();
      }
    });
  }

  deleteStudy(study: Study) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '210px',
      data: { titulo: "Eliminar Estudio", texto: "Esta seguro que desea Eliminar este Estudio?", respuesta: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      const retorno: boolean = result;

      if (retorno) {
        this._auxiliar.deleteStudy(study).subscribe(result => {
          this.getStudies();
        });
      }
    });
  }

  deleteLaboralExperience(param: LaboralExperience) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '230px',
      data: { titulo: "Eliminar Experiencia Laboral", texto: "Esta seguro que desea Eliminar esta experiencia laboral?", respuesta: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      const retorno: boolean = result;

      if (retorno) {
        this._auxiliar.deleteLaboralExperience(param).subscribe(result => {
          this.getLaboralExperiences();
        });
      }
    });
  }

  deleteLanguage(param: Language) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '230px',
      data: { titulo: "Eliminar Estudio", texto: "Esta seguro que desea Eliminar este estudio?", respuesta: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      const retorno: boolean = result;

      if (retorno) {
        this._auxiliar.deleteLanguage(param).subscribe(result => {
          this.getLanguages();
        });
      }
    });
  }

  getLaboralExperiences() {
    this._auxiliar.getLaboralExperiences(this.myContact).subscribe(result => {
      this.dataSource.data = result;
      this.myContact.laboralExperiences = result;
      this.getLanguages();
    });
  }

  getLanguages() {
    this._auxiliar.getLanguages(this.myContact).subscribe(result => {
      this.dataSourceLanguages.data = result;
      this.myContact.languages = result;
      // FINAL
      this.getStudies();
    })
  }

  editLanguage(language: Language) {
    let dialogRef = this.dialog.open(LanguageEditDialogComponent, {
      width: '500px',
      data: {
        myContact: this.myContact,
        language: language
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getLanguages();
      }
    });
  }

  addLanguage() {
    let dialogRef = this.dialog.open(LanguageEditDialogComponent, {
      width: '500px',
      data: {
        myContact: this.myContact
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getLanguages();
      }
    });
  }

  getStudies() {
    // FINAL
    this.studies = [];
    this._auxiliar.getStudies(this.myContact).subscribe(data => {
      this.studies = data;
      this.dataSourceStudies.data = data;
      this.myContact.studies = data;
    });
  }

  editStudy(pStudy: Study) {
    let dialogRef = this.dialog.open(StudyEditDialogComponent, {
      width: '500px',
      data: {
        myContact: this.myContact,
        study: pStudy
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getStudies();
      }
    });
  }

  // fileChange(event) {
  //   let fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     let file: File = fileList[0];
  //     let formData: FormData = new FormData();
  //     this.name = this.path + file.name;
  //     formData.append('uploadFile', file, file.name);
  //     this._auxiliar.setImage(formData);
  //     this.isUploadBtn = true;
  //   }
  // }
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
