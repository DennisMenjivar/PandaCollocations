import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '../../../../_models/Contact.model';
import { Study } from '../../../../_models/Study.model';
import { ColocationService } from '../../../../_lib/colocation.service';

@Component({
  selector: 'app-study-edit-dialog',
  templateUrl: './study-edit-dialog.component.html',
  styleUrls: ['./study-edit-dialog.component.scss']
})
export class StudyEditDialogComponent implements OnInit {

  myContact: Contact;
  myStudy: Study = new Study();

  kinds = [{ value: 0, viewValue: 'Estudio' }, { value: 1, viewValue: 'Curso' }];

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog, public dialogRef: MatDialogRef<StudyEditDialogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.myContact = this.data.myContact;
    }
    if (this.data.study) {
      this.myStudy = this.data.study;
    }
  }

  ngOnInit() {
  }

  setStudy() {
    this.myStudy.id_contact = this.myContact.ID;
    this._auxiliar.setStudy(this.myStudy).subscribe(result => {

    })
  }

}
