import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { OpeRoutes } from './ope.routing';
import { ResumesComponent } from '../../System/ope/resumes/resumes/resumes.component';
import { SendResumesComponent } from '../../System/ope/resumes/send-resumes/send-resumes.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OpeRoutes),
        FormsModule,
        MaterialModule
    ],
    providers: [

    ],
    declarations: [
        ResumesComponent,
        SendResumesComponent
    ],
    entryComponents: [

    ],
    exports: [

    ],
    bootstrap: []
})

export class OpeModule {
    constructor() {

    }
}
