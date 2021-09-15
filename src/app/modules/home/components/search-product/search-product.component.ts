import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { apiImagenesUrl } from 'src/environments/environment.prod';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  showSpinner = false;

  public products: any[] = [
  ];
  public user: any;
  public nullImage = "null";
  imgDefault: any = '../../../../../assets/img/img_Default/default1.png'
  urlImgs: any;
  constructor(private rest: RestService, public auth: AuthService) { }

  // Search
  _advanced = '';
  _location = '';
  _categoryFather = '';
  _published = '';
  _maximum = '';
  _minimum = '';

  @Input()
  set advanced(value) {
    this._advanced = value;
    this.ngOnInit();
    console.log("advanced: " + this._advanced);
  };

  @Input()
  set location(value) {
    this._location = value;
    this.ngOnInit();
    console.log("location: " + this._location);
  };
  @Input()
  set categoryFather(value) {
    this._categoryFather = value;
    this.ngOnInit();
    console.log("categoryFather: " + this._categoryFather);
  };
  @Input()
  set published(value) {
    this._published = value;
    this.ngOnInit();
    console.log("published: " + this._published);
  };
  @Input()
  set maximum(value) {
    this._maximum = value;
    this.ngOnInit();
    console.log("maximum: " + this._maximum);
  };
  @Input()
  set minimum(value) {
    this._minimum = value;
    this.ngOnInit();
    console.log("minimum: " + this._minimum);
  };

  @Input() categories: any[];
  // /rest/products ? location = ${ this._location }& published=${ this._published }& advanced=${ this._advanced }& maximum=${ this.maximum }& user_id=${ this.user.id }& minimum=${ this._minimum }& categoryFather=${ this._maximum }

  async ngOnInit() {
    this.urlImgs = apiImagenesUrl.url;
    // this.user = this.auth.user;
    // if (!this.user) {
    //   this.user.id = null;
    // }
    this.showSpinner = true
    await this.rest.get(`/rest/products?advanced=${this._advanced}&categoryFather=${this._categoryFather}`).then((productsdata) => {
      console.log(productsdata);
      this.products = productsdata.data.data.data
      console.log({productsdata});
    });
    this.showSpinner = false
  }

}

export interface IUser {
  id?: string;
}
