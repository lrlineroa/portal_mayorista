import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListItemAction } from '../../components/list/list.component';
import { RestService } from 'src/app/core/services/rest.service';
import { ToolsService } from 'src/app/core/services/tools.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {

  listActions: ListItemAction[] = [
    {
      icon: 'edit', title: 'Editar', callback: (event, item) => {

      }, color: 'primary'
    },
    {
      icon: 'trash', title: 'Eliminar', callback: (event, item) => {

      }, color: 'danger'
    }
  ];

  navLinks = [
    { path: '/admin/configuration/category', label: 'Categoria' },
    { path: '/admin/configuration/subCategory', label: 'Sub-Categoria' },
    { path: '/admin/configuration/template', label: 'Caracteristicas' }
  ];

  constructor() { }

  ngOnInit() { }


}













