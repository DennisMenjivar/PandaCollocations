import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../_models/Contact.model';
import { Router } from '@angular/router';
import { ColocationService } from '../../../../_lib/colocation.service';
import { ContactInformation } from '../../../../_models/ContactInformation.model';
import { ContactAdditionalInformation } from '../../../../_models/ContactAdditionalInformation.model';
import { Category } from '../../../../_models/Category.model';
import { SubCategory } from '../../../../_models/SubCategory.model';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { ExperienceEditDialogComponent } from '../experience-edit-dialog/experience-edit-dialog.component';
import { MatPaginator, MatTableDataSource, DateAdapter } from '@angular/material';
import { Experience } from '../../../../_models/Experience.model';
import { Language } from '../../../../_models/Language.model';
import { LanguageEditDialogComponent } from '../language-edit-dialog/language-edit-dialog.component';
import { Study } from '../../../../_models/Study.model';
import { StudyEditDialogComponent } from '../study-edit-dialog/study-edit-dialog.component';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  title: string = 'Crear Contacto';

  dataSource = new MatTableDataSource<Experience>();
  displayedColumns = ['ID', 'Company', 'functions', 'salary', 'fromString', 'until', 'editar'];

  dataSourceLanguages = new MatTableDataSource<Language>();
  displayedColumnsLanguages = ['ID', 'Lenguaje', 'Nivel', 'editar'];

  dataSourceStudies = new MatTableDataSource<Study>();
  displayedColumnsStudies = ['ID', 'study', 'institute', 'kind', 'editar'];

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
  studies: Study[];

  constructor(public router: Router, public _auxiliar: ColocationService, public dialog: MatDialog) {
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
      this.myContact = new Contact(this.id_company);
    }
    if (_auxiliar.myContact != null) {
      this.myContact = _auxiliar.myContact;
      this.title = this.myContact.firstName + ' ' + this.myContact.lastName;
    }
    this.getCategories();
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
        this.getLaboralExperiences();
      });
    }
    this.getStudies();
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

  openDialog(): void {
    let dialogRef = this.dialog.open(ExperienceEditDialogComponent, {
      width: '500px',
      data: {
        myContact: this.myContact
        // , miRamo: this.ramo
        // , miAseguradora: this.miAseguradora
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getLaboralExperiences();
      }
    });
  }

  editLaboralExperience(experience: Experience) {
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

  getLaboralExperiences() {
    this._auxiliar.getLaboralExperiences(this.myContact).subscribe(result => {
      this.dataSource.data = result;
      this.getLanguages();
    })
  }

  getLanguages() {
    this._auxiliar.getLanguages(this.myContact).subscribe(result => {
      this.dataSourceLanguages.data = result;
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
    this.studies = [];
    this._auxiliar.getStudies(this.myContact).subscribe(data => {
      this.studies = data;
      this.dataSourceStudies.data = data;
    })
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

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      this.name = this.path + file.name;
      formData.append('uploadFile', file, file.name);
      this._auxiliar.setImage(formData);
      this.isUploadBtn = true;
    }
  }

  isUploadBtn: boolean;
  name: string;
  path: string = "http://grandappapi.grandapp.xyz/Photos/";
}
