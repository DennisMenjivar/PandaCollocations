import { Routes } from '@angular/router';
import { ContactsComponent } from './Contacts/contacts/contacts.component';
import { CreateContactComponent } from './Contacts/create-contact/create-contact.component';

export const CrmRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'contactos/:id',
            component: ContactsComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'crearContacto/:id',
            component: CreateContactComponent
        }]
    }
];