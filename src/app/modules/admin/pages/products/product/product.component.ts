import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/core/services/rest.service';
import { ToolsService } from 'src/app/core/services/tools.service';
import { apiImagenesUrl } from 'src/environments/environment.prod';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  urlImgs: any;
  nullImage: string = 'null'
  parametroIdEsperado: string;
  productoCreateName: string = '';
  product: IProduct = {
    name: '',
    product_feactures: [],
    image1: null
  };
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private rest: RestService,
    private notification: ToolsService) {
    this.urlImgs = apiImagenesUrl.url;

    this.activatedRoute.params
      .subscribe(parametros => {
        this.parametroIdEsperado = parametros.id
        this.rest.get(`/store/products/${parametros.id}`).then((products: any) => {
          this.product = products.data;
          console.log(this.product);
        });
      });

  }

  ngOnInit() {

  }
  public forma: FormGroup;
  UpdateProduct(forma: NgForm) {
    const prod = forma.value
    console.log(prod);
    this.rest.put(`/store/products/${this.parametroIdEsperado}`, {
      body: prod,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
    });
  }


  // ! IMAGES SHOW
  // **********************************************************************
  //Image 1
  fileUpload1: File = null;
  fileImage1: File = null;
  image1 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage1(file: FileList) {
    this.fileUpload1 = file.item(0);
    this.fileImage1 = file.item(0);
    const formData = new FormData();
    formData.append('image1', this.fileImage1);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image1 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload1);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}?XDEBUG_SESSION_START=PHPSTORM`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 1 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 2
  fileUpload2: File = null;
  fileImage2: File = null;
  image2 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage2(file: FileList) {
    this.fileUpload2 = file.item(0);
    this.fileImage2 = file.item(0);
    const formData = new FormData();
    formData.append('image2', this.fileImage2);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image2 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload2);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 2 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 3
  fileUpload3: File = null;
  fileImage3: File = null;
  image3 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage3(file: FileList) {
    this.fileUpload3 = file.item(0);
    this.fileImage3 = file.item(0);
    const formData = new FormData();
    formData.append('image3', this.fileImage3);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image3 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload3);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 3 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 4
  fileUpload4: File = null;
  fileImage4: File = null;
  image4 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage4(file: FileList) {
    this.fileUpload4 = file.item(0);
    this.fileImage4 = file.item(0);
    const formData = new FormData();
    formData.append('image4', this.fileImage4);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image4 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload4);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 4 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 5
  fileUpload5: File = null;
  fileImage5: File = null;
  image5 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage5(file: FileList) {
    this.fileUpload5 = file.item(0);
    this.fileImage5 = file.item(0);
    const formData = new FormData();
    formData.append('image5', this.fileImage5);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image5 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload5);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 5 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 6
  fileUpload6: File = null;
  fileImage6: File = null;
  image6 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage6(file: FileList) {
    this.fileUpload6 = file.item(0);
    this.fileImage6 = file.item(0);
    const formData = new FormData();
    formData.append('image6', this.fileImage6);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image6 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload6);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 6 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 7
  fileUpload7: File = null;
  fileImage7: File = null;
  image7 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage7(file: FileList) {
    this.fileUpload7 = file.item(0);
    this.fileImage7 = file.item(0);
    const formData = new FormData();
    formData.append('image7', this.fileImage7);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image7 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload7);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 7 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 8
  fileUpload8: File = null;
  fileImage8: File = null;
  image8 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage8(file: FileList) {
    this.fileUpload8 = file.item(0);
    this.fileImage8 = file.item(0);
    const formData = new FormData();
    formData.append('image8', this.fileImage8);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image8 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload8);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 8 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 9
  fileUpload9: File = null;
  fileImage9: File = null;
  image9 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage9(file: FileList) {
    this.fileUpload9 = file.item(0);
    this.fileImage9 = file.item(0);
    const formData = new FormData();
    formData.append('image9', this.fileImage9);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image9 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload9);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 9 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }
  // **********************************************************************
  //Image 10
  fileUpload10: File = null;
  fileImage10: File = null;
  image10 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage10(file: FileList) {
    this.fileUpload10 = file.item(0);
    this.fileImage10 = file.item(0);
    const formData = new FormData();
    formData.append('image10', this.fileImage10);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image10 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload10);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this.parametroIdEsperado}`, {
      body: formData,
      ignoreMessage: false
    }).then((res) => {
      console.log(res);
      // this.notification.NotificationExito('Imagen 10 actualizada', '', 4000);
      this.router.navigate(['/admin/product/product/', this.parametroIdEsperado]);
    });
  }


}

export interface IProduct {
  name?: string;
  description?: string;
  price?: string;
  product_feactures?: ICaracteristicas[];
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  image10?: string;
}

export interface ICaracteristicas {
  key: string,
  id: string,
  value: string,
}
