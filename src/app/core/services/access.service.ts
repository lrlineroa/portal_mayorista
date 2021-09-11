import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private auth: AuthService) {

  }

  public hasPermissionTo(permissionCode: string | string[]): boolean {
    if (Array.isArray(permissionCode)) {
      return permissionCode.map(p => this.hasPermissionTo(p)).reduce((p, c) => p || c);
    } else {
      if (!permissionCode) return true;
      permissionCode = permissionCode.toUpperCase();
      for (let permission of this.user.permissions || [])
        if (permission.name === permissionCode || permission.name === 'ONE_ABOVE_ALL')
          return true;
      return false;
    }
  }

  public get user() {
    return this.auth.user || {};
  }
}
