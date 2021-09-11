import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderUserName'
})
export class DataOrderUserName implements PipeTransform {

  transform(values: any, valorBuscar: string): any {
    if (!values || !valorBuscar) {
      return values;
    }
    return values.filter(value =>
      value.first_name.toLowerCase().indexOf(valorBuscar.toLowerCase()) !== -1
    );
  }
}

