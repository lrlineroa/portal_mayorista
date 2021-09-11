import { Component, OnInit } from "@angular/core";
import { ToolsService } from "src/app/core/services/tools.service";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestService } from 'src/app/core/services/rest.service';

@Component({
  selector: "app-page-login",
  templateUrl: "./page-login.component.html",
  styleUrls: ["./page-login.component.scss"]
})
export class PageLoginComponent implements OnInit {
  user: any = {};
  recuperar = false;
  email: '';
  password: '';
  correoReset: '';
  constructor(
    private notificationService: ToolsService,
    private auth: AuthService,
    private rest: RestService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('_user'));
    if (this.user) {
      this.router.navigate(['/']);
    }
  }

  async login() {
    const { email, password } = this;
    if (!email || email === '') {
      this.notificationService.NotificationInfo(
        "Por favor digite el correo",
        "Información",
        parseInt("3000", 10)
      );
    } else if (!password || password === '') {
      this.notificationService.NotificationInfo(
        "Por favor digite la contraseña",
        "Información",
        parseInt("3000", 10)
      );
    } else {
      try {
        await this.auth.login({ email, password });
        this.router.navigate(['/admin']);
      } catch (error) {

      }
    }
  }

  ResetPasword() {
    this.rest.post(`/password/create`, {
      body: { email: this.correoReset }
    });
  }


  async loginTwitter() {

  }
}
