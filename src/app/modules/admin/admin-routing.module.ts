import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { CategoryComponent } from './pages/configuration/pagesConfig/category/category.component';
import { SubCategoryComponent } from './pages/configuration/pagesConfig/sub-category/sub-category.component';
import { TemplateComponent } from './pages/configuration/pagesConfig/template/template.component';
import { ProductsComponent } from './pages/products/products.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { SaldoComponent } from './pages/saldo/saldo.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { ProductComponent } from './pages/products/product/product.component';

const redirectTo = '/admin/profile';
const routes: Routes = [
  {
    path: "", component: PageAdminComponent,
    children: [
      { path: '', redirectTo, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'favorite', component: FavoriteComponent },
      { path: 'saldo', component: SaldoComponent },
      {
        path: 'product', component: ProductsComponent
        , children: [
          { path: 'create-product', component: CreateProductComponent },
          { path: 'list-products', component: ListProductsComponent },
          { path: 'product/:id', component: ProductComponent }
        ]
      },
      { path: 'users', component: UsersComponent },
      {
        path: 'configuration', component: ConfigurationComponent, children: [
          { path: 'category', component: CategoryComponent },
          { path: 'subCategory', component: SubCategoryComponent },
          { path: 'template', component: TemplateComponent }
        ]
      }
    ]
  },
  { path: "**", redirectTo, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
