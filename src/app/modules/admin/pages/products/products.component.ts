import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  navLinks = [
    { path: '/admin/product/list-products', label: 'Lista de Productos' },
    { path: '/admin/product/create-product', label: 'Crear Producto' },
  ];
}
