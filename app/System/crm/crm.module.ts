import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { ContactsComponent } from './Contacts/contacts/contacts.component';
import { CrmRoutes } from './crm.routing';
import { CreateContactComponent } from './Contacts/create-contact/create-contact.component';
import { PandaListsComponent } from './panda-lists/panda-lists.component';
import { ExperienceEditDialogComponent } from './Contacts/experience-edit-dialog/experience-edit-dialog.component';
import { LanguageEditDialogComponent } from './Contacts/language-edit-dialog/language-edit-dialog.component';
import { StudyEditDialogComponent } from './Contacts/study-edit-dialog/study-edit-dialog.component';
import { SystemKnowledgesComponent } from '../../System/crm/Contacts/system-knowledges/system-knowledges.component';
import { CreateSKDialogComponent } from '../crm/Contacts/system-knowledges/create-skdialog/create-skdialog.component';

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
        StudyEditDialogComponent,
        SystemKnowledgesComponent,
        CreateSKDialogComponent,
    ],
    entryComponents: [
        ExperienceEditDialogComponent,
        LanguageEditDialogComponent,
        StudyEditDialogComponent,
        CreateSKDialogComponent
    ],
    exports: [

    ]
})

export class CrmModule {
    constructor() {

    }
}
