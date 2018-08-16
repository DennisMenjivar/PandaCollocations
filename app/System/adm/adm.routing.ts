import { Routes } from '@angular/router';
import { ManagementResumesComponent } from './management/management-resumes/management-resumes.component';
import { PdfViewerComponent } from './pdf/pdf-viewer/pdf-viewer.component';

export const AdmRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'login',
            // component: LoginPrincipalComponent
        }]
    }
    , {
        path: '',
        children: [{
            path: 'managementResumes/:id',
            component: ManagementResumesComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'pdfViewer/:id',
            component: PdfViewerComponent
        }]
    }
];