import { DataSearch } from './api.types';
import { HttpHeaders } from '@angular/common/http';
import { Type } from '@angular/core';

// TODO-LIB [make]: Create "ResourcesConfig" and receive module for manage resources
/* #################### GLOBAL TYPES #################### */
export interface ApiModuleConfig {
  baseUrl: string;
  paramsUrl?: string;
  resourceComponent?: Type<any>;
  redirects?: {
    noLogged?: string;
    accessDenied?: string;
  };
  auth?: {
    prefix?: string;
    urls?: AuthUrls;
  };
  pusher?: {
    key: string;
    cluster: string;
  };
  socials?: {
    linkedinID?: string;
    facebookID?: string;
    googleID?: string;
  };
}

/* #################### AUTH TYPES #################### */
export interface AuthUrls {
  login?: string;
  logout?: string;
  validate?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

// TODO-LIB [make]: sometime implement defaults resources
// TODO-LIB [make]: when default resources have been implement, convert params in an default resource
/* #################### PARAMETER TYPES #################### */
export interface Param {
  id: number;
  code: string;
  value: string;
  description: string;
}

/* #################### REST TYPES #################### */
export interface Where {
  column: string;
  op: '=' | '!=' | '>=' | '<=' | 'like';
  value: string | number | boolean;
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  params?: { [param: string]: string | string[] };
  body?: object;
  headers?: HttpHeaders;
  ignoreMessage?: boolean;
  receiver?: any;
  cacheAction?: 'reload' | 'no-cache';
}

export interface JsendResponse {
  message?: string;
  data?: any;
  pagination?: ResponsePagination;
  status: 'success' | 'fail' | 'error';
}

export interface ResponsePagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  path: string;
}

/* #################### DATA INTERACTION TYPES #################### */
export interface DataSort {
  column: string;
  dir: 'asc' | 'desc';
}

export interface DataQuery {
  // implement in backend
  type: 'or' | 'and';
  values: (Where | DataQuery)[];
}

export interface DataPaginator {
  page: number;
  per_page?: number;
}

export interface DataSearchRelations {
  [id_column: string]: {
    name: string;
    display_key: string; // Automatize this with field "display" returned from backend (custom attribute for all models)
  };
}

export interface DataSearch {
  global?: string;
  by_column?: {
    [column: string]: string;
  };
  relations?: DataSearchRelations;
  filterables?: string[];
}

export interface DataParams {
  query?: DataQuery; // TODO: Create compatibility in backend
  search?: DataSearch;
  sort?: DataSort;
  paginator?: DataPaginator;
  show_deleted?: boolean;
}
