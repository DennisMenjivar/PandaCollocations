import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ColocationService } from '../../../../_lib/colocation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource, DateAdapter } from '@angular/material';
import { Contact } from '../../../../_models/Contact.model';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import swal from 'sweetalert2';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';
import { Email } from '../../../../_models/Email.model';
import { Resume } from '../../../../_models/Resume.model';
declare var $: any;

@Component({
  selector: 'app-management-resumes',
  templateUrl: './management-resumes.component.html',
  styleUrls: ['./management-resumes.component.scss']
})
export class ManagementResumesComponent implements OnInit {

  membership: number = 0;

  id_company: number = 0;

  dataSource = new MatTableDataSource<Resume>();
  displayedColumns = ['select', 'name', 'ciudad', 'yearsOld', 'profesion', 'interestArea', 'status'];
  selection = new SelectionModel<Resume>(true, []);

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog, public router: Router) {
    _auxiliar.myContact = null;
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
    }
  }

  ngOnInit() {
    this.getResumes();
  }

  getResumes() {
    var cu = JSON.parse(sessionStorage.getItem('currentUser'));
    this.membership = cu.membership;
    var id_company = cu.id_company;
    this._auxiliar.getResumes(id_company).subscribe(result => {
      this.dataSource.data = result;
    });
  }

  sendEmail() {
    let email = new Email();
    this.selection.selected.forEach(element => {
      email.body += 'Nombre Completo: ' + element.name + '\n'
        + 'Identidad: ' + element.identityString + '\n'
        + 'Curriculum: ' + element.pdfLink + '\n\n';
    });

    email.name = 'Dennis Menjivar';
    email.email = 'dnsmenjivar@gmail.com';
    email.password = 'Zero1234$$0507';
    email.from = 'dnsmenjivar@gmail.com';
    email.to = 'honduraspanda@gmail.com';
    email.toName = 'Panda Honduras';
    email.subject = 'Curriculums';

    email.CC = 'david.avila92@hotmail.com';
    this._auxiliar.sendEmail(email).subscribe(result => {
      if (result) {
        console.log("Se envio");
      }
    })
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
