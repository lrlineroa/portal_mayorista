import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: "home", loadChildren: "./modules/home/home.module#HomeModule" },
  { path: "login", loadChildren: "./modules/login/login.module#LoginModule" },
  {
    path: "admin", loadChildren: "./modules/admin/admin.module#AdminModule"
  },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
