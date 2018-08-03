import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { AdmRoutes } from './adm.routing';
import { ManagementResumesComponent } from '../../System/adm/management/management-resumes/management-resumes.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdmRoutes),
        FormsModule,
        MaterialModule
    ],
    providers: [

    ],
    declarations: [
    ManagementResumesComponent],
    entryComponents: [

    ],
    exports: [

    ]
})

export class AdmModule {
    constructor() {

    }
}
