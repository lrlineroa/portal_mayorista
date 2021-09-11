import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Api } from '../config';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  private redirectTo: string;

  constructor(private auth: AuthService, private router: Router) {
    this.redirectTo = Api.config.redirects.noLogged || 'login';
  }

  canLoad(route: Route) {
    return this.verify();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.verify();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.verify();
  }

  async verify() {
    if (!this.auth.isAuthenticated) {
      if (this.redirectTo) this.router.navigateByUrl(this.redirectTo);
      this.auth.cleanSession();
      return false;
    } else {
      if (!this.auth.user) {
        const valid = await this.auth.validate();
        if (!valid) this.router.navigateByUrl(this.redirectTo);
        return valid;
      }
      return true;
    }
  }
}
