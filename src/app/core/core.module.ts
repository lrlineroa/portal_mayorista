import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { ApiModuleConfig } from './api.types';
import { Api } from './config';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { CachingInterceptor } from './interceptors/caching-interceptor';
import { AccessService } from './services/access.service';
import { AuthService } from './services/auth.service';
import { HttpCaching } from './services/caching.service';
import { PusherService } from './services/pusher.service';
import { RestService } from './services/rest.service';

// Notificaciones
const CACHING_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: CachingInterceptor,
  multi: true
};

@NgModule({
  providers: [CACHING_PROVIDER, HttpCaching,
    AuthService,
    RestService,
    AuthGuard,
    AdminGuard,
    PusherService,
    AccessService
  ],
  declarations: [],
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    ToastrModule.forRoot()
  ]
})
export class CoreModule {
  constructor() {
    Api.setConfig({} as ApiModuleConfig);
  }
}
