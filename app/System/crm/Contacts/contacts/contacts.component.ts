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
