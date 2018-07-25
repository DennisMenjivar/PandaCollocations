import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { ContactsComponent } from './Contacts/contacts/contacts.component';
import { CrmRoutes } from './crm.routing';
import { CreateContactComponent } from '../../System/crm/Contacts/create-contact/create-contact.component';
import { PandaListsComponent } from '../../System/crm/panda-lists/panda-lists.component';
import { ExperienceEditDialogComponent } from '../../System/crm/Contacts/experience-edit-dialog/experience-edit-dialog.component';
import { LanguageEditDialogComponent } from '../../System/crm/Contacts/language-edit-dialog/language-edit-dialog.component';

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
        CreateContactComponent,
        PandaListsComponent,
        ExperienceEditDialogComponent,
        LanguageEditDialogComponent,
    ],
    entryComponents: [
        ExperienceEditDialogComponent,
        LanguageEditDialogComponent
    ],
    exports: [

    ]
})

export class CrmModule {
    constructor() {

    }
}
