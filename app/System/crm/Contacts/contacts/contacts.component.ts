import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ColocationService } from '../../../../_lib/colocation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource, DateAdapter } from '@angular/material';
import { Contact } from '../../../../_models/Contact.model';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactos: Contact[];

  membership: number = 0;

  id_company: number = 0;

  dataSource = new MatTableDataSource<Contact>();

  displayedColumns = ['ID', 'name', 'identity', 'profesion', 'status', 'editar'];

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog, public router: Router) {
    _auxiliar.myContact = null;
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
    }
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    var cu = JSON.parse(sessionStorage.getItem('currentUser'));
    this.membership = cu.membership;
    var id_company = cu.id_company;
    let contact: Contact = new Contact(id_company);
    this._auxiliar.getContacts(contact).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  activeUser(contact: Contact) {
    swal({
      title: 'Activar Contacto',
      text: 'Desea activar a ' + contact.firstName + ' ' + contact.lastName + '?',
      type: 'question',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        console.log("Se Activo");
      }
    }).catch(swal.noop);
  }

  pay(contact: Contact) {
    swal({
      title: 'Pagar Membresía',
      text: 'Desea pagar la membresía de ' + contact.firstName + ' ' + contact.lastName + '?',
      type: 'question',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        console.log("Se Activo");
      }
    }).catch(swal.noop);
  }

  newContact() { }

  editContact(contact: Contact) {
    this._auxiliar.myContact = contact;
    this._auxiliar.myContact.id_company = this.id_company;
    this._auxiliar.getContactInformation(contact).subscribe(data => {
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
    })
    this.router.navigate(['/crm/crearContacto', this.id_company]);
  }

  createContact() {
    this.router.navigate(['/crm/crearContacto', this.id_company])
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
