import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RestService } from 'src/app/core/services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  headers = new HttpHeaders();
  urlCreateCategory = 'http://localhost:8000/api/store/categories';
  urlCategories = 'http://localhost:8000/api/store/categories';

  constructor(private http: HttpClient, private rest: RestService) {

  }



  GetCategories() {
    return this.http.get(this.urlCategories);
  }

  InsertarNuevaCategory(category: any) {
    let token = 'asdasdasdasd';
    let body = JSON.stringify(category);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authentication': `Bearer ${token}`
    });
    return this.http.post(this.urlCreateCategory, body, { headers })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }
}
