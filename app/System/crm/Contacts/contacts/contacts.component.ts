import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ColocationService } from '../../../../_lib/colocation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource, DateAdapter } from '@angular/material';
import { Contact } from '../../../../_models/Contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input()
  tipo_origen: string;

  @Input()
  id_origen: number;

  contactos: Contact[];

  membership: number = 0;

  dataSource = new MatTableDataSource<Contact>();

  displayedColumns = ['ID', 'name', 'identity', 'profesion', 'status', 'editar'];

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog) { }

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

  }

  newContact() { }

  editContact(contact: Contact) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
