import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api } from '../config';
import { Observable } from 'rxjs';
import { JsendResponse, RequestOptions, RequestMethod } from '../api.types';
import { isNullOrUndefined } from 'util';
import { ToolsService } from './tools.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class RestService {
  private readonly baseUrl: string;
  public headers: HttpHeaders;

  constructor(private http: HttpClient, private tools: ToolsService) {
    this.baseUrl = Api.config.baseUrl;
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      'CMS-Client-Token': 'CMS2831F6A84E2'
    });
  }

  public async get<T = JsendResponse>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    return await this.request<T>('GET', endpoint, options);
  }

  public async post<T = JsendResponse>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    return await this.request<T>('POST', endpoint, options);
  }

  public async put<T = JsendResponse>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    return await this.request<T>('PUT', endpoint, options);
  }

  public async delete<T = JsendResponse>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    return await this.request<T>('DELETE', endpoint, options);
  }

  public async request<T = JsendResponse>(
    method: RequestMethod,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = this.baseUrl + (endpoint || '');
    if (isNullOrUndefined(options.headers)) options.headers = new HttpHeaders();
    if (options.cacheAction) {
      options.headers = options.headers.set(
        'App-Cache-Action',
        options.cacheAction
      );
    }
    const req: Observable<T> = this.http.request<T>(method, url, {
      body: options.body,
      headers: this.mergeHeaders(options.headers),
      params: options.params
    });
    let response: T;
    try {
      response = await req.toPromise();
    } catch (exception) {
      response = exception.error;
    }
    options.receiver = response;
    if (response['message'] && !options.ignoreMessage)
      this.tools.NotificationExito(response['message'], '', 3000)
    return response;
  }

  private mergeHeaders(customHeaders: HttpHeaders): HttpHeaders {
    let _headers: HttpHeaders = new HttpHeaders();
    let _appends: HttpHeaders = customHeaders || new HttpHeaders();
    this.headers
      .keys()
      .filter(name => !_appends.keys().includes(name))
      .forEach(name => (_headers = _headers.set(name, this.headers.get(name))));
    _appends
      .keys()
      .forEach(name => (_headers = _headers.set(name, _appends.get(name))));
    if (
      _headers.has('Content-Type') &&
      _headers.get('Content-Type') === 'undefined'
    )
      _headers = _headers.delete('Content-Type');

    return _headers;
  }
}
