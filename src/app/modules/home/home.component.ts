import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { apiImagenesUrl } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // img products
  public nullImage = "null";
  imgDefault: any = '../../../../../assets/img/img_Default/default1.png'
  urlImgs: any;
  // 
  public categories_Pro = [

  ];
  public productFive_Pro: IproductFive[] = [
    { name: '' }
  ];
  public productOne_Pro: IproductFive[] = [
    { name: '' }
  ];
  public productTop2_Pro: IproductFive[] = [
    { name: '' }
  ];
  public productTop3_Pro: IproductFive[] = [
    { name: '' }
  ];
  public Information = [
    { name: 'Seguridad en tus ventas', img: '../../..//assets/img/imgClientes/ITarjeta.png' },
    { name: 'Protección de tus datos', img: '../../..//assets/img/imgClientes/IProteccion.png' },
    { name: 'Sorpote Tecnico', img: '../../..//assets/img/imgClientes/Icall.png' },
  ]

  constructor(
    private rest: RestService,
    public router: Router
  ) { }

  ngOnInit() {
    this.urlImgs = apiImagenesUrl.url;
    this.GetProductsTopFirst4();
    this.GetProductsTopOne();
    this.GetProductsTop2();
    this.GetProductsTop3();
    this.GetCategories();
  }

  // Get information Page Home
  GetProductsTopFirst4() {
    this.rest.get(`/rest/productstop`,
      {
        ignoreMessage: false
      }
    ).then((res) => {
      // console.log(res);
      if (res.data.length > 0) {
        this.productFive_Pro = res.data;
      }
    });
  }
  GetProductsTopOne() {
    this.rest.get(`/rest/productstop`,
      {
        ignoreMessage: false
      }
    ).then((res: any) => {
      // console.log((res));
      if (res.data.length > 0) {
        this.productOne_Pro = res.data;
      }
    });
  }
  GetProductsTop2() {
    this.rest.get(`/rest/productstop2`,
      {
        ignoreMessage: false
      }
    ).then((res: any) => {
      // console.log((res));
      if (res.data.length > 0) {
        // console.log('TOP 111', res.data)
        this.productTop2_Pro = res.data;
      }
    });
  }
  GetProductsTop3() {
    this.rest.get(`/rest/productstop3`,
      {
        ignoreMessage: false
      }
    ).then((res: any) => {
      // console.log((res));
      if (res.data.length > 0) {
        // console.log('TOP 222', res.data)
        this.productTop3_Pro = res.data;
      }
    });
  }

  GetCategories() {
    this.rest.get(`/rest/categories`,
      {
        ignoreMessage: false
      }
    ).then((res: any) => {
      if (res.length > 0) {
        this.categories_Pro = res;
      }
    });
  }



  // Busqueda avanzada - Filtros
  _advanced = '';
  _location;
  _categoryFather = '';
  _published;
  _maximum;
  _minimum;
  BusquedaAvanzada(advanced: string) {
    // console.log(advanced);
    this._advanced = advanced;
    this.router.navigate(['/home/search-product']);
  }
  BusquedaCategory(idCategory: string) {
    this._categoryFather = idCategory;
    this.router.navigate(['/home/search-product']);
  }
  BuscarAllCategory() {
    this._categoryFather = ''
    this.router.navigate(['/home/search-product']);
  }



}


export interface IproductFive {
  name?: string, image1?: string, price?: string, description?: string
}
