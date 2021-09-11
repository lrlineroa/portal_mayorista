import { environment } from 'src/environments/environment';

import { ApiModuleConfig } from './api.types';

export abstract class Api {
  private static _config: ApiModuleConfig;

  static setConfig(config: ApiModuleConfig) {
    if (!this._config) {
      this._config = this.mergeObject(defaultConfig, config) as ApiModuleConfig;
    }
  }

  static get config() {
    return this._config;
  }

  static mergeObject(object, newObject): object {
    let result = {};
    Object.keys(object).forEach(k => {
      if (typeof object[k] === 'object')
        result[k] = this.mergeObject(object[k], newObject[k]);
      else if (object && object[k] !== undefined) {
        newObject = newObject || {};
        result[k] = newObject[k] || object[k];
      }
    });
    return result;
  }
}

const defaultConfig: ApiModuleConfig = {
  // Local
  // baseUrl: environment.apiUrl || 'http://localhost:8000',

  // Stiven
  baseUrl: environment.apiUrl || 'http://localhost:9090',

  // Pro
  // baseUrl: environment.apiUrl || 'http://186.31.83.245:8600',
  auth: {
    prefix: '/auth',
    urls: {
      validate: '/validate',
      logout: '/logout',
      login: '/login'
    }
  },
  redirects: {
    noLogged: '/login',
    accessDenied: '/login'
  },
  pusher: {
    key: '',
    cluster: ''
  }
};
