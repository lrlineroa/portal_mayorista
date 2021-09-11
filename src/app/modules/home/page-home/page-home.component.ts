import { Component, OnInit } from "@angular/core";
import { ToolsService } from 'src/app/core/services/tools.service';
import { RestService } from 'src/app/core/services/rest.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { apiImagenesUrl } from 'src/environments/environment.prod';

@Component({
  selector: "app-page-home",
  templateUrl: "./page-home.component.html",
  styleUrls: ["./page-home.component.scss"]
})
export class PageHomeComponent implements OnInit {
  idProduct: string;
  nullImage: string = 'null'
  urlImgs: any;
  user: any = {};
  imgDefault: any = '../../../../../assets/img/img_Default/anadir1.png'
  public categories: any[] = [];

  products: any[] = [];
  getCategories() {
    this.rest.get('/store/categories?wheres=[{"column": "category_id", "op":"=","value":null}]',
      { ignoreMessage: false }).then((data: any) => {
        this.categories = data.data;
      });
  }

  constructor(private rest: RestService, private notification: ToolsService, private auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('_user'));

  }

  async ngOnInit() {
    this.urlImgs = apiImagenesUrl.url;
    await this.getCategories();
    this.rest.get('/rest/products', { ignoreMessage: false }).then((data: any) => {
      this.products = data;
      console.log(this.products);
      console.log(this.urlImgs);
    })
  }

  logout() {
    this.auth.logout();
  }

  CaputrarIDProduct(id: string) {
    this.idProduct = id;
    console.log(this.idProduct);
  }




}
