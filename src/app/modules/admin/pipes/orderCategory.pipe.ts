import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderCategory'
})
export class DataOrderPipeCategory implements PipeTransform {

  transform(values: any, valorBuscar: string): any {
    if (!values || !valorBuscar) {
      return values;
    }
    return values.filter(value =>
      value.name.toLowerCase().indexOf(valorBuscar.toLowerCase()) !== -1
    );
  }

}
