import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AdminModule } from './modules/admin/admin.module';
import { MaterialModule } from './shared/materialAngular/material';
import { OwlModule } from 'ngx-owl-carousel';
import { SharedModule } from './shared/shared.module';

// Notificaciones
// material
// Servicios

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    AdminModule,
    CoreModule,
    OwlModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
