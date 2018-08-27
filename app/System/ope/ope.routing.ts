import { Routes } from '@angular/router';
import { ResumesComponent } from './resumes/resumes/resumes.component';
import { SendResumesComponent } from './resumes/send-resumes/send-resumes.component';

export const OpeRoutes: Routes = [
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
            path: 'resumes/:id',
            component: ResumesComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'sendResumes/:id',
            component: SendResumesComponent
        }]
    }
];