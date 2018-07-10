import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { ContactsComponent } from './Contacts/contacts/contacts.component';
import { CrmRoutes } from './crm.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CrmRoutes),
        FormsModule,
        MaterialModule
    ],
    providers: [

    ],
    declarations: [
        ContactsComponent,
    ],
    entryComponents: [

    ],
    exports: [

    ]
})

export class CrmModule {
    constructor() {

    }
}
