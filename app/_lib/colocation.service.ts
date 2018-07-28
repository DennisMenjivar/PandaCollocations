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
import { NumberModel } from '../_models/Number.model';
import { Experience } from '../_models/Experience.model';
import { Language } from '../_models/Language.model';
import { Study } from '../_models/Study.model';

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

  // LANGUAGES
  getLanguages(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getLanguages/', body, requestOptions).map((data: Response) => {
      return data.json() as Language[];
    });
  }

  setLanguages(language: Language) {
    var body = JSON.stringify(language);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/setLanguage/', body, requestOptions).map((data: Response) => {
      return 1;
    });
  }

  // EXPERIENCES
  getLaboralExperiences(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getLaboralExperiences/', body, requestOptions).map((data: Response) => {
      return data.json() as Experience[];
    });
  }

  setLaboralExperience(experience: Experience) {
    var body = JSON.stringify(experience);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/setLaboralExperience/', body, requestOptions).map((data: Response) => {
      return 1;
    });
  }

  // STUDIES
  getStudies(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getStudies/', body, requestOptions).map((data: Response) => {
      return data.json() as Study[];
    });
  }

  setStudy(study: Study) {
    var body = JSON.stringify(study);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/setStudy/', body, requestOptions).map((data: Response) => {
      return 1;
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
      return data.json() as number;
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
  // PANDA
  getMinRangeNumber(number: NumberModel) {
    var body = JSON.stringify(number);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getMinRangeNumber/', body, requestOptions).map((data: Response) => {
      return data.json() as NumberModel;
    });
  }

  getMumujas(number: NumberModel) {
    var body = JSON.stringify(number);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getMumujas/', body, requestOptions).map((data: Response) => {
      return data.json() as NumberModel[];
    });
  }

  getGoodNumbers(number: NumberModel) {
    var body = JSON.stringify(number);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/colocatechapi/getSureNumbers/', body, requestOptions).map((data: Response) => {
      return data.json() as NumberModel[];
    });
  }

  setImage(f: FormData) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    this._http.post(this.current_api + 'api/colocatechapi/UploadJsonFile/', f, options).subscribe(
      data => console.log('success', data),
      error => console.log(error)
    );
  }
}
