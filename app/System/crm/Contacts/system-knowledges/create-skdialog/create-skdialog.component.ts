import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColocationService } from '../../../../../_lib/colocation.service';
import { Contact } from '../../../../../_models/Contact.model';
import { SystemKnowledge } from '../../../../../_models/SystemKnowledge.model';

@Component({
  selector: 'app-create-skdialog',
  templateUrl: './create-skdialog.component.html',
  styleUrls: ['./create-skdialog.component.scss']
})
export class CreateSKDialogComponent implements OnInit {

  myContact: Contact;
  myClass: SystemKnowledge = new SystemKnowledge();

  levels = [{ value: 0, viewValue: 'Básico' }, { value: 1, viewValue: 'Intermedio' }, { value: 2, viewValue: 'Avanzado' }];

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog, public dialogRef: MatDialogRef<CreateSKDialogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.myContact = this.data.myContact;
    }
    if (this.data.systemKnowledge) {
      this.myClass = this.data.systemKnowledge;
    }
  }

  ngOnInit() {
  }

  setSystemKnowledge() {
    this.myClass.id_contact = this.myContact.ID;
    this._auxiliar.setSystemsKnowledge(this.myClass).subscribe(data => {
      if (data) {

      }
    })
  }

}
