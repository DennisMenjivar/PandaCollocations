import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BaseRowDef } from '@angular/cdk/table';
import { Login } from '../_models/Login.model';
import { Contact } from '../_models/Contact.model';

@Injectable()

export class ColocationService {

  connected: boolean = false;

  // myLogin: Login = new Login('', '');

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

  getContacts(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getContacts/', body, requestOptions).map((data: Response) => {
      return data.json() as Contact[];
    });
  }
}
