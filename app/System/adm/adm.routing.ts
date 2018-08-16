import { Routes } from '@angular/router';
import { ManagementResumesComponent } from './management/management-resumes/management-resumes.component';

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
    }
];