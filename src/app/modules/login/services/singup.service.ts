import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SingupService {
  urlProd = environment.apiUrl;
  urlGetCountries = `${this.urlProd}/rest/countries`
  urlGetStates = `${this.urlProd}/rest/states`;
  urlGetCities = `${this.urlProd}/rest/cities`;
  urldocumentTypes = `${this.urlProd}/rest/documentTypes`;
  urlCreateUser = `${this.urlProd}/rest/users`;
  constructor(private http: HttpClient) { }

  GetCountries() {
    return this.http.get(this.urlGetCountries);
  }
  GetStates() {
    return this.http.get(this.urlGetStates);
  }
  GetCities() {
    return this.http.get(this.urlGetCities);
  }
  GetdocumentTypes() {
    return this.http.get(this.urldocumentTypes);
  }

  insertarNuevoUsuario(cliente: any) {
    let body = JSON.stringify(cliente);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.urlCreateUser, body, { headers })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

}
