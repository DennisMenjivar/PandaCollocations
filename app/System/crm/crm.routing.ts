import { Routes } from '@angular/router';
import { ContactsComponent } from './Contacts/contacts/contacts.component';

export const CrmRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'contactos',
        component: ContactsComponent
    }]}
    // , {
    //     path: '',
    //     children: [ {
    //       path: 'contacto',
    //       component: ContactoEditComponent
    //       }]
    //   }
];