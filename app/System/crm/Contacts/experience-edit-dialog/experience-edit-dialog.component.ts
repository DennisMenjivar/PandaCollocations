import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColocationService } from '../../../../_lib/colocation.service';
import { Experience } from '../../../../_models/Experience.model';
import { Contact } from '../../../../_models/Contact.model';

@Component({
  selector: 'app-experience-edit-dialog',
  templateUrl: './experience-edit-dialog.component.html',
  styleUrls: ['./experience-edit-dialog.component.scss']
})
export class ExperienceEditDialogComponent implements OnInit {

  myExperience: Experience = new Experience();
  myContact: Contact;

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog, public dialogRef: MatDialogRef<ExperienceEditDialogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.myContact = this.data.myContact;
    }
    if (this.data.experience) {
      this.myExperience = this.data.experience;
    }
  }

  ngOnInit() {

  }

  setLaboralExperience() {
    this.myExperience.id_contact = this.myContact.ID;
    this._auxiliar.setLaboralExperience(this.myExperience).subscribe(data => {
      if (data) {

      }
    })
  }

}
