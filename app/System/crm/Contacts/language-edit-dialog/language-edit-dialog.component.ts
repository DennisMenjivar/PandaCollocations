import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColocationService } from '../../../../_lib/colocation.service';
import { Contact } from '../../../../_models/Contact.model';
import { Language } from '../../../../_models/Language.model';

@Component({
  selector: 'app-language-edit-dialog',
  templateUrl: './language-edit-dialog.component.html',
  styleUrls: ['./language-edit-dialog.component.scss']
})
export class LanguageEditDialogComponent implements OnInit {

  myContact: Contact;
  myLanguaje: Language = new Language();

  levels = [{ value: 0, viewValue: 'Básico' }, { value: 1, viewValue: 'Intermedio' }, { value: 2, viewValue: 'Avanzado' }, { value: 3, viewValue: 'Nativo' }];

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog, public dialogRef: MatDialogRef<LanguageEditDialogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.myContact = this.data.myContact;
    }
    if (this.data.language) {
      this.myLanguaje = this.data.language;
    }
  }

  ngOnInit() {
  }

  setLanguage() {
    this.myLanguaje.id_contact = this.myContact.ID;
    this._auxiliar.setLanguages(this.myLanguaje).subscribe(data => {
      if (data) {

      }
    })
  }

}
