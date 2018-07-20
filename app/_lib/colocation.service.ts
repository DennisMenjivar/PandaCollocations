import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BaseRowDef } from '@angular/cdk/table';
import { Login } from '../_models/Login.model';
import { Contact } from '../_models/Contact.model';
import { Category } from '../_models/Category.model';
import { SubCategory } from '../_models/SubCategory.model';
import { ContactInformation } from '../_models/ContactInformation.model';

@Injectable()

export class ColocationService {

  connected: boolean = false;

  myContact: Contact = null;

  current_api: string = "http://grandappapi.grandapp.xyz/";//"http://creaxisapi.creaxis.xyz/";

  constructor(private _http: Http) { }

  validarLogin(login: Login) {
    var body = JSON.stringify(login);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/login/', body, requestOptions).map((data: Response) => {
      return data.json() as Login;
    });
  }
  // CONTACTS
  getContacts(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getContacts/', body, requestOptions).map((data: Response) => {
      return data.json() as Contact[];
    });
  }

  setContact(contact: Contact) {
    var body = JSON.stringify(contact);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/setContact/', body, requestOptions).map((data: Response) => {
      return 1;
    });
  }

  getContactInformation(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getContactInformation/', body, requestOptions).map((data: Response) => {
      return data.json() as ContactInformation;
    });
  }

  // Category
  getCategories() {
    let category: Category = new Category();
    var body = JSON.stringify(category);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getCategories/', body, requestOptions).map((data: Response) => {
      return data.json() as Category[];
    });
  }

  getSubCategories(category: Category) {
    var body = JSON.stringify(category);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getSubcategories/', body, requestOptions).map((data: Response) => {
      return data.json() as SubCategory[];
    });
  }
}
