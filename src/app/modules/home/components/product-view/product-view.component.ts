import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @Input() product:Product;
  constructor() { }
  public nullImage = "null";
  imgDefault: any = '../../../../../assets/img/img_Default/default1.png'
  ngOnInit() {
  }

}

interface Product {
  active: any;
  category_father_id: any;
  category_id: any;
  created_at: any;
  deleted_at: any;
  description: any;
  flag: any;
  id: any;
  image1: any;
  image10: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
  image6: any;
  image7: any;
  image8: any;
  image9: any;
  likes: any;
  name: any;
  negotiable_price: any;
  price: any;
  reported: any;
  seen: any;
  updated_at: any;
  user_id: any;
  web_positioning: any;
}
