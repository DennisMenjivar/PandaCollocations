import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ColocationService } from '../../../../_lib/colocation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource, DateAdapter } from '@angular/material';
import { Contact } from '../../../../_models/Contact.model';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import swal from 'sweetalert2';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
declare var $: any;

@Component({
  selector: 'app-management-resumes',
  templateUrl: './management-resumes.component.html',
  styleUrls: ['./management-resumes.component.scss']
})
export class ManagementResumesComponent implements OnInit {

  contactos: Contact[];

  membership: number = 0;

  id_company: number = 0;

  dataSource = new MatTableDataSource<Contact>();
  displayedColumns = ['select', 'name', 'identity', 'profesion', 'status'];
  selection = new SelectionModel<Contact>(true, []);

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

  setContactStatus(contact: Contact) {
    this._auxiliar.setContactStatus(contact).subscribe(result => {
      this.getContacts();
    });
  }

  preActiveUser(contact: Contact) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '210px',
      data: { titulo: "Activar Usuario", texto: "Esta seguro que desea Activar a " + contact.firstName + ' ' + contact.lastName + '?', respuesta: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      const retorno: boolean = result;

      if (retorno) {
        contact.status = 1;
        this.setContactStatus(contact);
      }
    });
  }

  prePayUser(contact: Contact) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '210px',
      data: { titulo: "Pagar Membresia", texto: "Esta seguro que desea Pagar a " + contact.firstName + ' ' + contact.lastName + '?', respuesta: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      const retorno: boolean = result;

      if (retorno) {
        contact.paid = 1;
        this.setContactStatus(contact);
      }
    });
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
