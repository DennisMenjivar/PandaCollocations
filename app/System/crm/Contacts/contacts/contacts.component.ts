import { Component, OnInit, Input } from '@angular/core';
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

  @Input()
  tipo_origen: string;

  @Input()
  id_origen: number;

  contactos: Contact[];

  dataSource = new MatTableDataSource<Contact>();

  displayedColumns = ['ID', 'name', 'identity', 'profesion', 'editar'];

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    var cu = JSON.parse(localStorage.getItem('currentUser'));
    var id_company = cu.id_company;
    let contact: Contact = new Contact(id_company);
    this._auxiliar.getContacts(contact).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  newContact() { }

  editContact(id: number) { }

}