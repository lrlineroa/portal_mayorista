import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { apiImagenesUrl } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
  latitudeMap: any = null;
  longitudeMap: any = null;
  username: ''
  urlImgs: any;
  nullImage: string = "null"
  imgDefault: any = '../../../../../assets/img/img_Default/anadir1.png'
  public product = {
    name: '',
    description: '',
    price: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
    image7: '',
    image8: '',
    image9: '',
    image10: '',
    product_feactures: [],
    user: []
  };

  _idProd;
  _userid;


  @Input()
  set idProduct(value) {
    this._idProd = value;
    console.log("Id Product: " + this._idProd);
    this.GetProduct();
  };

  constructor(private rest: RestService) {
    console.log(this.idProduct);
  }

  GetProduct() {
    if (this._idProd) {
      this.rest.get(`/rest/products/${this._idProd}`, { ignoreMessage: false }).then((data: any) => {
        this.product = data;
        this.username = data.user[0].name
        console.log(this.product);
      });
    }
  }

  ngOnInit() {
    this.urlImgs = apiImagenesUrl.url;
  }

  Getlocation(e) {
    this.latitudeMap = e.lat;
    this.longitudeMap = e.lng;
    console.log("Loc a Guardar:", + this.latitudeMap, + this.longitudeMap);
  }

}

export interface IProduct {
  name: string

}
