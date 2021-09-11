import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Api } from '../config';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AdminGuard implements CanLoad, CanActivate, CanActivateChild {
  private redirectTo: string;

  constructor(private auth: AuthService, private router: Router, private authGuard: AuthGuard) {
    this.redirectTo = Api.config.redirects.accessDenied || 'login';
  }

  canLoad(route: Route): Promise<boolean> {
    return this.verify();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.verify();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.verify();
  }

  verify(): Promise<boolean> {
    let auth = this.authGuard.verify();
    return new Promise<boolean>((resolve, reject) => {
      let callback = () => {
        let user = this.auth.user;
        let result = false;
        if (user) {
          if (user.roles)
            result = this.auth.hasRole('master');
          else result = !!user.admin;
        }
        if (!result)
          this.router.navigateByUrl(this.redirectTo);
        resolve(result);
      };
      if (auth instanceof Promise)
        auth.then(value => callback());
      else callback();
    });
  }
}
