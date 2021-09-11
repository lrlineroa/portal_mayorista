import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryComponent } from './pages/configuration/pagesConfig/category/category.component';
import { SubCategoryComponent } from './pages/configuration/pagesConfig/sub-category/sub-category.component';
import { TemplateComponent } from './pages/configuration/pagesConfig/template/template.component';

// Servicios
import { CategoryService } from './services/category.service';
import { HttpClientModule } from "@angular/common/http";
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { ProductsComponent } from './pages/products/products.component';
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes
import { MaterialModule } from 'src/app/shared/materialAngular/material';
import { DataOrderPipe } from './pipes/data-order.pipe';
import { DataOrderPipeCategory } from './pipes/orderCategory.pipe';
import { DataOrderUserName } from './pipes/orderUser-Name.pipe';
import { OwlModule } from 'ngx-owl-carousel';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { CoreModule } from 'src/app/core/core.module';
import { SaldoComponent } from './pages/saldo/saldo.component';
import { UsersComponent } from './pages/users/users.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { ProductComponent } from './pages/products/product/product.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { ImagesProductComponent } from './pages/products/images-product/images-product.component';
import { MapaComponent } from './components/mapa/mapa.component';

// Map
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [PageAdminComponent, ProfileComponent, ChatComponent, ConfigurationComponent, CategoryComponent, SubCategoryComponent, TemplateComponent, ListComponent, FormComponent, ProductsComponent, DataOrderPipe, DataOrderPipeCategory, FavoriteComponent, SaldoComponent, UsersComponent, DataOrderUserName, ListProductsComponent, ProductComponent, CreateProductComponent, ImagesProductComponent, MapaComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    OwlModule,
    CoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4mDSQUc77PX08_UlFSea_VbiYRCfd1A8'
    })
  ],
  providers: [CategoryService]
})
export class AdminModule { }