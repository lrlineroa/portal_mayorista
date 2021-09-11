import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToolsService } from 'src/app/core/services/tools.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  panelOpenState = false;
  products: any[] = [];

  idProduct: any;
  nameProduct: any;

  constructor(private rest: RestService, private aut: AuthService, private notification: ToolsService) { }

  ngOnInit() {
    this.rest.get(`/store/products?wheres=[{"column": "user_id", "op":"=","value":${this.aut.user.id}}]`).then((productsData) => {
      console.log({productsData});
      this.products = productsData.data;
      console.log(this.products);
    });
  }

  // elimiar Producto
  CapturarDelete(id: string, name: string) {
    this.idProduct = id;
    this.nameProduct = name;
  }
  DeleteProduct() {
    if (this.idProduct) {
      this.rest.delete(`/store/products/${this.idProduct}`, {
        ignoreMessage: true
      }).then(() => {
        this.notification.NotificationExito('Producto eliminado', '', 5000);
        this.ngOnInit();
      })
    }
  }





}
