import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favorites: any[] = [
    { name: "Nike", money: "60000" },
    { name: "MSI", money: "120000" },
    { name: "Busos", money: "120000" },
    { name: "Adidas", money: "60000" },
    { name: "BMW Sportage", money: "60000" },
    { name: "rink ring", money: "555000" },
    { name: "reloj", money: "7000000" },
    { name: "medias", money: "85000" },
    { name: "lg nevera mejor", money: "78000" },
    { name: "ionic", money: "78000" },
    { name: "Nike", money: "60000" },
    { name: "MSI", money: "120000" },
    { name: "Busos", money: "120000" },
    { name: "Adidas", money: "60000" },
    { name: "BMW Sportage", money: "60000" },
    { name: "rink ring", money: "555000" },
    { name: "reloj", money: "7000000" },
    { name: "medias", money: "85000" },
    { name: "lg nevera mejor", money: "78000" },
    { name: "ionic", money: "79000" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
