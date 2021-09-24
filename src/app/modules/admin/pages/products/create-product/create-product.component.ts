import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { ToolsService } from 'src/app/core/services/tools.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { apiImagenesUrl } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productoCreateId: string;
  productoCreateName: string;

  urlImgs: any;
  public forma: FormGroup;


  product: any = {
    name: "",
    description: "",
    price: "",
  }


  // loading
  loagingSub: boolean = false;

  // VAriable
  public products: any[];
  // Page Select Categorias - Sub Categoria
  opcionSeleccionado: string = '0';
  idSubcategoria: string = '';
  idcategoria: string = '';
  nameSubcategoria: string = '';
  nameCAtegory: string = '';

  validateCategory: boolean = false;
  validateProduct: boolean = false;
  validateImages: boolean = false;
  validaInformation: boolean = false;

  user: any = {};
  public categories: any[] = [];
  public subCategories: any[] = [];
  public caracteristicas: ICaracteristicas[] = [];



  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  documentTypes: any[] = [];

  // Metodos
  constructor(private rest: RestService, private notification: ToolsService, private _formBuilder: FormBuilder, private router: Router) {

    this.user = JSON.parse(localStorage.getItem('_user'));
    this.rest.get('/store/categories?wheres=[{"column": "category_id", "op":"=","value":null}]', { ignoreMessage: false }).then((data) => {
      this.categories = data.data;
    });
    this.urlImgs = apiImagenesUrl.url;
  }

  //Correo Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")])
  createItem(): FormGroup {
    return this._formBuilder.group({

    });
  }

  ngOnInit() {
    this.validaInformation;
  }
  flag = false;
  prod: any;


  Validar(forma: NgForm) {
    const prod = forma.value
    console.log({prod});
    // if (1 === 1) {
    //   // ?XDEBUG_SESSION_START=PHPSTORM
    //   this.rest.post('/store/products', {
    //     body: prod,
    //     ignoreMessage: false
    //   }).then((res) => {
    //     console.log(res);
    //     if (res.status === 'success') {
    //       this.validateProduct = true;
    //       this.notification.NotificationInfo('Click en siguiente', '', 6000);
    //       this.productoCreateId = res.data.id;
    //       this.productoCreateName = res.data.name;
    //       console.log(this.productoCreateId + ' ' + this.productoCreateName);
    //     } else if (res.data[0] === 'The name and category have already been registered.') {
    //       this.validateProduct = false;
    //       this.notification.NotificationInfo('El nombre ya existe en tus productos', '', 6000);
    //       console.log(res.data);
    //     } else {
    //       this.validateProduct = false;
    //       this.notification.NotificationInfo('Por favor validar información.', '', 6000);
    //     }
    //   });
    // }
  }

  VerDatos() {
    if (this.validateProduct === false) {
      this.notification.NotificationInfo('Dar click en "Validar y guardar producto".', 'Validar Información', 6000);
    }
  }

  CambiarEstadoFlag() {
    this.flag = false;

  }

  // MEtodos de PAge Categorias - Subcategorias
  categoria(id: string, name: string) {
    this.loagingSub = true;
    this.rest.get(`/store/categories?wheres=[{"column": "category_id", "op":"=","value":${id}}]`, { ignoreMessage: false }).then((subcategories) => this.subCategories = subcategories.data);
    this.nameCAtegory = name;
    this.loagingSub = false;
  }

  capturarIDSubcategoria() {

    if (this.idSubcategoria === "null" || this.idSubcategoria === "" || this.idSubcategoria === "0") {
      this.notification.NotificationInfo('', 'Seleccione una subcategoria', 3000);
    } else {
      this.rest.get(`/store/categoryFeactures?wheres=[{"column": "category_id", "op":"=","value":${this.idSubcategoria}}]`)
        .then((caracteristicas) => {
          this.caracteristicas = caracteristicas.data;
          this.ngOnInit();
          console.log(this.caracteristicas);
        });
      this.notification.NotificationExito(`Categoria ${this.nameCAtegory}/${this.nameSubcategoria}`, 'Has seleccionado', 5000);
      console.log(this.idSubcategoria);
    }
  }

  capturar() {
    this.idSubcategoria = this.opcionSeleccionado;
    if (this.idSubcategoria === "null" || this.idSubcategoria === "0") {
      this.validateCategory = false;
    } else if (this.idSubcategoria !== '') {
      this.rest.get(`/store/categories?wheres=[{"column": "id", "op":"=","value":${this.idSubcategoria}}]`)
        .then((data) => this.nameSubcategoria = data.data[0].name);
      this.validateCategory = true;
    }
  }


}


export interface ICaracteristicas {
  key: string,
  id: string,
  value: string,
}

export interface IProducto {
  id
}
