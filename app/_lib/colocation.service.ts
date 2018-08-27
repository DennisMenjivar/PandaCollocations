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
import { LaboralExperience } from '../_models/LaboralExperience.model';
import { Language } from '../_models/Language.model';
import { Study } from '../_models/Study.model';
import { ContactAdditionalInformation } from '../_models/ContactAdditionalInformation.model';
import { Email } from '../_models/Email.model';
import swal from 'sweetalert2';
import { Resume } from '../_models/Resume.model';
import { SystemKnowledge } from '../_models/SystemKnowledge.model';

@Injectable()

export class ColocationService {

  connected: boolean = false;

  myContact: Contact = null;
  myEmail: Email = null;

  current_api: string = "http://collocationsapi.colocacioneshonduras.com/";//"http://creaxisapi.creaxis.xyz/";

  constructor(private _http: Http) { }

  validarLogin(login: Login) {
    var body = JSON.stringify(login);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/login/', body, requestOptions).map((data: Response) => {
      return data.json() as Login;
    }, error => {
      console.log("Error al login: ", error);

    });
  }
  // Systems Knowledges
  getSystemsKnowledges(param: Contact) {
    var body = JSON.stringify(param);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getSystemsKnowledges/', body, requestOptions).map((data: Response) => {
      return data.json() as SystemKnowledge[];
    });
  }

  setSystemsKnowledge(param: SystemKnowledge) {
    var body = JSON.stringify(param);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/setSystemsKnowledge/', body, requestOptions).map((data: Response) => {
      return 1;
    });
  }

  // RESUMES
  getResumes(id_company: number) {
    var body = JSON.stringify(id_company);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getResumes/', body, requestOptions).map((data: Response) => {
      return data.json() as Resume[];
    });
  }

  // LANGUAGES
  getLanguages(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getLanguages/', body, requestOptions).map((data: Response) => {
      return data.json() as Language[];
    });
  }

  setLanguages(language: Language) {
    var body = JSON.stringify(language);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/setLanguage/', body, requestOptions).map((data: Response) => {
      return 1;
    });
  }

  // EXPERIENCES
  getLaboralExperiences(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getLaboralExperiences/', body, requestOptions).map((data: Response) => {
      return data.json() as LaboralExperience[];
    });
  }

  setLaboralExperience(experience: LaboralExperience) {
    var body = JSON.stringify(experience);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/setLaboralExperience/', body, requestOptions).map((data: Response) => {
      return 1;
    });
  }

  // STUDIES
  getStudies(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getStudies/', body, requestOptions).map((data: Response) => {
      return data.json() as Study[];
    });
  }

  setStudy(study: Study) {
    var body = JSON.stringify(study);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/setStudy/', body, requestOptions).map((data: Response) => {
      return 1;
    });
  }

  // CONTACTS
  getContacts(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getContacts/', body, requestOptions).map((data: Response) => {
      return data.json() as Contact[];
    });
  }

  setContact(contact: Contact) {
    var body = JSON.stringify(contact);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/setContact/', body, requestOptions).map((data: Response) => {
      return data.json() as number;
    });
  }

  getContactInformation(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getContactInformation/', body, requestOptions).map((data: Response) => {
      return data.json() as ContactInformation;
    });
  }

  getContactAdditionalInformation(contact: Contact) {
    var body = JSON.stringify(contact);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getContactAdditionalInformation/', body, requestOptions).map((data: Response) => {
      return data.json() as ContactAdditionalInformation;
    });
  }

  setContactStatus(contact: Contact) {
    var body = JSON.stringify(contact);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/setContactStatus/', body, requestOptions).map((data: Response) => {
      return 1;
    });
  }

  // Category
  getCategories() {
    let category: Category = new Category();
    var body = JSON.stringify(category);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getCategories/', body, requestOptions).map((data: Response) => {
      return data.json() as Category[];
    });
  }

  getSubCategories(category: Category) {
    var body = JSON.stringify(category);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getSubcategories/', body, requestOptions).map((data: Response) => {
      return data.json() as SubCategory[];
    });
  }
  // PANDA
  getMinRangeNumber(number: NumberModel) {
    var body = JSON.stringify(number);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getMinRangeNumber/', body, requestOptions).map((data: Response) => {
      return data.json() as NumberModel;
    });
  }

  getMumujas(number: NumberModel) {
    var body = JSON.stringify(number);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getMumujas/', body, requestOptions).map((data: Response) => {
      return data.json() as NumberModel[];
    });
  }

  getGoodNumbers(number: NumberModel) {
    var body = JSON.stringify(number);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/getSureNumbers/', body, requestOptions).map((data: Response) => {
      return data.json() as NumberModel[];
    });
  }

  sendEmail(email: Email) {
    var body = JSON.stringify(email);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/sendEmail/', body, requestOptions).map((data: Response) => {
      this.showSwal('success-message', 'ENVIADO', 'El correo fúe enviado correctamente.');
      return 1;
    });
  }

  // setImage(f: FormData) {
  //   let headers = new Headers();
  //   let options = new RequestOptions({ headers: headers });
  //   this._http.post(this.current_api + 'api/CollocationsApi/UploadJsonFile/', f, options).subscribe(
  //     data => 
  //     console.log('success', data),
  //     error => console.log(error)
  //   );
  // }

  setImage(f: FormData, contact: Contact) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.current_api + 'api/CollocationsApi/UploadJsonFile/', f, options).subscribe(result => {
      // CREO EL PDF
      this.PDF(contact).subscribe(result => {
        this.showSwal('success-message', 'BUEN TRABAJO', 'Se creo el contacto y el archivo PDF correctamente.')
      })
    }, error => {
      this.showSwal('error', 'ERROR', 'Error al guardar, por favor vuelva a guardar o revise su internet.')
    });
  }

  PDF(contact: Contact) {
    var body = JSON.stringify(contact);
    var headerOptions = new Headers({ 'Content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions })

    return this._http.post(this.current_api + 'api/CollocationsApi/createPDFResume/', body, requestOptions).map((data: any) => {
      return 1;
    });
  }

  showSwal(type, titleMessage: string, message: string) {
    if (type === 'basic') {
      swal({
        title: 'Here is a message!',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'
      }).catch(swal.noop);
    } else if (type === 'title-and-text') {
      swal({
        title: 'Here is a message!',
        text: 'It is pretty, is not it?',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info'
      }).catch(swal.noop);

    } else if (type === 'success-message') {
      swal({
        type: 'success',
        title: titleMessage,
        text: message,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'

      }).catch(swal.noop);
    } else if (type === 'error') {
      swal({
        type: 'error',
        title: titleMessage,
        text: message,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'

      }).catch(swal.noop);
    }
  }
}
