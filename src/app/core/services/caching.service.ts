import { HttpRequest, HttpResponse } from '@angular/common/http';
import { AfterContentChecked, Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

import { ParamsService } from './params.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCaching implements AfterContentChecked {
  private duration: number;
  private map = new Map<string, CacheObject>();

  constructor(public params: ParamsService) {
    this.duration = Number(params.getValue('CACHE_DURATION') || '300');
  }

  private get postfix() {
    const user = JSON.parse(localStorage.getItem('_user')) || {};
    return `${user.id || 'PUBLIC'}`;
  }

  set(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const available = req.headers.get('App-Cache-Action') !== 'no-cache';
    const key = `${url}___${this.postfix}`;
    if (available && response.ok && req.method.toUpperCase() === 'GET') {
      let value: CacheObject = {
        url,
        response,
        get_at: moment().unix(),
        expire_at: moment()
          .add(this.duration, 'seconds')
          .unix()
      };
      this.map.set(key, value);
    }
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const available = req.headers.get('App-Cache-Action') !== 'no-cache';
    const reload = req.headers.get('App-Cache-Action') === 'reload';
    const key = `${url}___${this.postfix}`;

    if (available && req.method.toUpperCase() === 'GET') {
      if (reload) this.map.delete(key);
      if (this.isExpiredOrUndefined(key)) return undefined; // ? delete object
      return (this.map.get(key) || ({} as CacheObject)).response;
    } else if (available) {
      const resourceKey = req.headers.get('App-Resource');
      this.map.forEach((v, k: string) => {
        const starts: any = (req.url.match(
          RegExp(`^${environment.apiUrl}\/[A-Za-z0-9]*`)
        ) || [null])[0];

        if (
          (starts && k.startsWith(starts)) ||
          (resourceKey &&
            url.startsWith(`${environment.apiUrl}/login`) &&
            k.startsWith(
              `${environment.apiUrl}/login`
            ))
        )
          this.map.delete(k);
      });
    }
    return null;
  }

  isExpiredOrUndefined(url: string): boolean {
    return (
      (this.map.get(url) || { expire_at: -1 }).expire_at <= moment().unix()
    );
  }

  ngAfterContentChecked(): void {
    this.map.forEach(obj => {
      if (this.isExpiredOrUndefined(obj.url)) this.map.delete(obj.url);
    });
  }
}

export interface CacheObject {
  url: string;
  get_at: number;
  expire_at: number;
  response: HttpResponse<any>;
}
