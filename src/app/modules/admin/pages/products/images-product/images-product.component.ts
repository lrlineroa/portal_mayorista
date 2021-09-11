import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { ToolsService } from 'src/app/core/services/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images-product',
  templateUrl: './images-product.component.html',
  styleUrls: ['./images-product.component.scss']
})
export class ImagesProductComponent implements OnInit {
  _productId;
  _productName;


  constructor(private rest: RestService, private notification: ToolsService, private router: Router) { }

  ngOnInit() {
  }

  @Input()
  set idProduct(value) {
    this._productId = value;
    console.log("Id Producto Imagenes: " + this._productId);
  };
  @Input()
  set nameProduct(value) {
    this._productName = value;
    console.log("nombre Producto Imagenes: " + this._productName);
  };

  // set asd(params) {

  // }

  // get asd() {
  //   return null;
  // }


  // ! IMAGES SHOW
  // **********************************************************************
  //Image 1
  fileUpload1: File = null;
  fileImage1: File = null;
  image1 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage1(file: FileList) {
    this.fileUpload1 = file.item(0);
    this.fileImage1 = file.item(0);
    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image1 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload1);
  }
  // **********************************************************************
  //Image 2
  fileUpload2: File = null;
  fileImage2: File = null;
  image2 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage2(file: FileList) {
    this.fileUpload2 = file.item(0);
    this.fileImage2 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image2 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload2);
  }
  // **********************************************************************
  //Image 3
  fileUpload3: File = null;
  fileImage3: File = null;
  image3 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage3(file: FileList) {
    this.fileUpload3 = file.item(0);
    this.fileImage3 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image3 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload3);
  }
  // **********************************************************************
  //Image 4
  fileUpload4: File = null;
  fileImage4: File = null;
  image4 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage4(file: FileList) {
    this.fileUpload4 = file.item(0);
    this.fileImage4 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image4 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload4);
  }
  // **********************************************************************
  //Image 5
  fileUpload5: File = null;
  fileImage5: File = null;
  image5 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage5(file: FileList) {
    this.fileUpload5 = file.item(0);
    this.fileImage5 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image5 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload5);
  }
  // **********************************************************************
  //Image 6
  fileUpload6: File = null;
  fileImage6: File = null;
  image6 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage6(file: FileList) {
    this.fileUpload6 = file.item(0);
    this.fileImage6 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image6 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload6);
  }
  // **********************************************************************
  //Image 7
  fileUpload7: File = null;
  fileImage7: File = null;
  image7 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage7(file: FileList) {
    this.fileUpload7 = file.item(0);
    this.fileImage7 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image7 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload7);
  }
  // **********************************************************************
  //Image 8
  fileUpload8: File = null;
  fileImage8: File = null;
  image8 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage8(file: FileList) {
    this.fileUpload8 = file.item(0);
    this.fileImage8 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image8 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload8);
  }
  // **********************************************************************
  //Image 9
  fileUpload9: File = null;
  fileImage9: File = null;
  image9 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage9(file: FileList) {
    this.fileUpload9 = file.item(0);
    this.fileImage9 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image9 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload9);
  }
  // **********************************************************************
  //Image 10
  fileUpload10: File = null;
  fileImage10: File = null;
  image10 = '../../../../assets/img/imgProductos/fotografia.png'

  PreViewImage10(file: FileList) {
    this.fileUpload10 = file.item(0);
    this.fileImage10 = file.item(0);

    // Show image
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image10 = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload10);
  }

  // !!! Update Product Images


  UpdateImages() {
    console.log(this.fileImage1);
    const formData = new FormData();
    formData.append('image1', this.fileImage1);
    formData.append('image2', this.fileImage2);
    formData.append('image3', this.fileImage3);
    formData.append('image4', this.fileImage4);
    formData.append('image5', this.fileImage5);
    formData.append('image6', this.fileImage6);
    formData.append('image7', this.fileImage7);
    formData.append('image8', this.fileImage8);
    formData.append('image9', this.fileImage9);
    formData.append('image10', this.fileImage10);
    formData.append('_method', 'put');
    // ?XDEBUG_SESSION_START = PHPSTORM
    this.rest.post(`/store/products/${this._productId}`, {
      body: formData,
      ignoreMessage: true
    }).then((res) => {
      console.log(res);
      this.notification.NotificationExito('Imagenes Guardadas', '', 4000);
      this.router.navigate(['/admin/product/product/', this._productId]);
    });

  }




}
