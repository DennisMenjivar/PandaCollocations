import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import * as jsPDF from 'jspdf';
import { ColocationService } from '../../../../_lib/colocation.service';
import { Contact } from '../../../../_models/Contact.model';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, OnDestroy {

  @ViewChild('content') content: ElementRef;

  id_contact: number;
  private sub: any;

  constructor(public _auxiliar: ColocationService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id_contact = +params['id']; // (+) converts string 'id' to a number
      console.log("ID Contacto: ", this.id_contact);
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnInit() {
  }

  downloadPDF() {
    this._auxiliar.PDF(new Contact(1)).subscribe(result => {

    });
    // const doc = new jsPDF();
    // doc.text('RESUME', 10, 10);
    // doc.save('Julian Perez.pdf');
    // this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
