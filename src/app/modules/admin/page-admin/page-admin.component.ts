import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestService } from 'src/app/core/services/rest.service';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/core/services/tools.service';
import { environment, apiImagenesUrl } from 'src/environments/environment.prod';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {
  urlImgs: any;
  user: any = {};
  toggleMenu: boolean;

  constructor(private auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('_user'));
    this.urlImgs = apiImagenesUrl.url;
  }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
  }

  get imgUrl() {
    const image = this.user.image && `${environment.apiUrl.replace(/\/api$/, '')}${this.user.image}`;
    return image || 'assets/img/pageAdmin/usuario.png';
  }

}
