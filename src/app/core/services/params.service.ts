import {Injectable, OnInit} from '@angular/core';
import {RestService} from './rest.service';
import {Param} from '../api.types';
import {Api} from '../config';

@Injectable({
  providedIn: 'root'
})
export class ParamsService implements OnInit{
  private _params: Param[] = [];
  private enpoint: string;

  constructor(private rest: RestService) {
    this.enpoint = Api.config.paramsUrl || '/parameters';
  }

  getValue(code: string): string {
    let param = this._params.find((p: Param) => p.code === code);
    return param ? param.value : null;
  }

  getParam(code: string): Param {
    return this._params.find(param => param.code === code);
  }

  getALl(): Param[] {
    return this._params;
  }

  ngOnInit(): void {
    this.rest.get(this.enpoint).then(response => this._params = response.data);
  }
}


