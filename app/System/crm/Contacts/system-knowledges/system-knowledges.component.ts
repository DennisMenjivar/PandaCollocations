import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../../_models/Contact.model';
import { ColocationService } from '../../../../_lib/colocation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatTableDataSource, DateAdapter } from '@angular/material';
import { Router } from '@angular/router';
import { SystemKnowledge } from '../../../../_models/SystemKnowledge.model';
import { CreateSKDialogComponent } from './create-skdialog/create-skdialog.component';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-system-knowledges',
  templateUrl: './system-knowledges.component.html',
  styleUrls: ['./system-knowledges.component.scss']
})
export class SystemKnowledgesComponent implements OnInit {

  @Input()
  myContact: Contact;

  id_company: number = 0;

  dataSource = new MatTableDataSource<SystemKnowledge>();
  displayedColumns = ['description', 'level', 'editar'];

  constructor(public _auxiliar: ColocationService, public dialog: MatDialog, public router: Router) {
    if (JSON.parse(sessionStorage.getItem('currentUser'))) {
      this.id_company = JSON.parse(sessionStorage.getItem('currentUser')).id_company;
    }
  }

  ngOnInit() {
    this.getSystemsKnowledge();
  }

  createSystemKnowledgeDialog() {
    let dialogRef = this.dialog.open(CreateSKDialogComponent, {
      width: '500px',
      data: {
        myContact: this.myContact,
        systemKnowledge: new SystemKnowledge()
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getSystemsKnowledge();
      }
    });
  }

  editSystemKnowledgeDialog(param: SystemKnowledge) {
    let dialogRef = this.dialog.open(CreateSKDialogComponent, {
      width: '500px',
      data: {
        myContact: this.myContact,
        systemKnowledge: param
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.getSystemsKnowledge();
      }
    });
  }

  deleteSystemKnowledge(param: SystemKnowledge) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '230px',
      data: { titulo: "Eliminar", texto: "Esta seguro que desea Eliminar este dato?", respuesta: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      const retorno: boolean = result;

      if (retorno) {
        this._auxiliar.deleteSystemKnowledge(param).subscribe(result => {
          this.getSystemsKnowledge();
        });
      }
    });
  }

  getSystemsKnowledge() {
    this._auxiliar.getSystemsKnowledges(this.myContact).subscribe(result => {
      this.dataSource.data = result;
      this.myContact.systemknowledges = result;
    })
  }

  editSystemKnowledge() {

  }

}
