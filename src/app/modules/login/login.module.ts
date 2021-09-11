import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

import { LoginRoutingModule } from './login-routing.module';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { SingupService } from './services/singup.service';
import { PageResetComponent } from './page-reset/page-reset.component';

@NgModule({
  declarations: [PageLoginComponent, PageRegisterComponent, PageResetComponent],
  imports: [CommonModule, LoginRoutingModule, HttpClientModule, FormsModule, CoreModule],
  providers: [
    SingupService
  ]
})
export class LoginModule { }
