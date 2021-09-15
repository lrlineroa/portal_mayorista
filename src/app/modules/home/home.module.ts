import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PageHomeComponent } from './page-home/page-home.component';
import { MaterialModule } from 'src/app/shared/materialAngular/material';
import { OwlModule } from 'ngx-owl-carousel';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
import { ProductBestSellerComponent } from './pages/product-best-seller/product-best-seller.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { MapaProductComponent } from './components/mapa-product/mapa-product.component';

// Map
import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home.component';
import { CarouselPublicidadComponent } from './components/carousel-publicidad/carousel-publicidad.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AnimationSpinnerComponent } from './components/animation-spinner/animation-spinner.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { CategoryViewComponent } from './components/category-view/category-view.component';
@NgModule({
  declarations: [CategoryViewComponent,PageHomeComponent, ProductBestSellerComponent, PageProductComponent, MapaProductComponent, HomeComponent, CarouselPublicidadComponent, SearchProductComponent, LoadingSpinnerComponent, AnimationSpinnerComponent,DropDownComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    MaterialModule,
    OwlModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4mDSQUc77PX08_UlFSea_VbiYRCfd1A8'
    })
  ],
  providers: []
})
export class HomeModule { }
