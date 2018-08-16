import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { AdmRoutes } from './adm.routing';
import { ManagementResumesComponent } from './management/management-resumes/management-resumes.component';
import { PdfViewerComponent } from './pdf/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdmRoutes),
        FormsModule,
        MaterialModule,
        PdfViewerModule
    ],
    providers: [

    ],
    declarations: [
        ManagementResumesComponent,
        PdfViewerComponent],
    entryComponents: [

    ],
    exports: [

    ],
    bootstrap: [PdfViewerComponent]
})

export class AdmModule {
    constructor() {

    }
}
