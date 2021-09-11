import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-best-seller',
  templateUrl: './product-best-seller.component.html',
  styleUrls: ['./product-best-seller.component.scss']
})
export class ProductBestSellerComponent implements OnInit {

  products: any[] = [
    { name: "mac", money: "6000000" },
    { name: "MSI", money: "120000" },
    { name: "Busos", money: "120000" },
    { name: "Adidas", money: "60000" },
    { name: "BMW Sportage", money: "60000" },
    { name: "rink ring", money: "555000" },
    { name: "reloj", money: "7000000" },
    { name: "medias", money: "85000" },
    { name: "lg", money: "78000" },
    { name: "lg", money: "78000" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
