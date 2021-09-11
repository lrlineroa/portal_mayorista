import { Injectable } from '@angular/core';
import { AuthCredentials, AuthUrls } from '../api.types';
import { RestService } from './rest.service';
import { Api } from '../config';
import { Router } from '@angular/router';
import { PusherService } from './pusher.service';
import { ToolsService } from './tools.service';

@Injectable()
export class AuthService {
  private _currentUser: any; // UserModel;
  private prefix: string;
  private urls: AuthUrls;

  constructor(
    private rest: RestService,
    protected tools: ToolsService,
    private router: Router,
    private pusher: PusherService
  ) {
    this.prefix = Api.config.auth.prefix;
    this.urls = Api.config.auth.urls;
    if (this.token && this.rest.headers) {
      this.rest.headers = this.rest.headers.set(
        'Authorization',
        'Bearer ' + this.token
      );
      this.validate().then(() => {

      }).catch(err => {
        debugger;
        if (err.message) this.tools.NotificationInfo(err.message, '', 5000);

        this.router.navigateByUrl(
          Api.config.redirects.noLogged || 'auth/login'
        );
      });
    } else if (!this.rest.headers) {
      console.error('headers object is not available!');
    }
  }

  public async login(credentials: AuthCredentials): Promise<boolean> {
    const response = await this.rest.post(this.prefix + this.urls.login, {
      body: credentials,
      ignoreMessage: true
    });
    if (response.status === 'success') {
      const data = response.data;
      const token = data.access_token;
      if (token) {
        localStorage.setItem('_token', token);
        this.setUser(data.user);
        this.rest.headers = this.rest.headers.set(
          'Authorization',
          'Bearer ' + token
        );
        this.tools.NotificationExito(response.message, '', 3000);
        return true;
      }
    }
    return false;
  }

  public async logout(): Promise<void> {
    // this.cleanSession();
    // let response = await this.rest.delete(this.prefix + this.urls.logout, {});
    // if (response.status === 'success') this.cleanSession();
    // return response.data;
    let response = await this.rest.delete(this.prefix + this.urls.logout, {});
    if (response.status === 'success') this.cleanSession();
    return response.data;

  }

  public async validate(): Promise<boolean> {
    if (this.rest.headers.has('Authorization')) {
      const response = await this.rest.get(this.prefix + this.urls.validate, {
        cacheAction: 'no-cache'
      });
      if (response.status === 'success') {
        const data = response.data;
        this.setUser(data.user);
        return true;
      }
    }
    this.cleanSession();
    return false;
  }

  public get token(): string {
    return localStorage.getItem('_token');
  }

  public get isAuthenticated(): boolean {
    return !!this.token && this.rest.headers.has('Authorization');
  }

  public cleanSession() {
    this.setUser(null);
    this.rest.headers = this.rest.headers.delete('Authorization');
    localStorage.removeItem('_token');
    this.router.navigateByUrl('/login');
  }

  public hasRole(roleName: string | string[], or: boolean = false): boolean {
    if (Array.isArray(roleName))
      return roleName
        .map(r => this.hasRole(r))
        .reduce((p, c) => (or ? p || c : p && c));
    let roles = this.user ? this.user.roles : [];
    return !!roles.find(role => role.name === roleName);
  }

  protected setUser(user: any) {
    this._currentUser = user;
    if (user) {
      localStorage.setItem('_user', JSON.stringify(user));
      this.pusher.bindToUser(user);
    } else {
      localStorage.removeItem('_user');
    }
  }

  public get user(): any {
    return this._currentUser;
  }

  public get userImage() {
    if (this.user && this.user.image)
      return Api.config.baseUrl.replace(/\/api$/, this.user.image);
    return 'assets/images/default-profile.png';
  }

  getUser(id: string) {
    this.rest.get(`/users/${id}`).then((user) => {
      this.setUser(user.data);
    });
  }


}
