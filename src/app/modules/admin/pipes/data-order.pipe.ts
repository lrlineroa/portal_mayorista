import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataOrder'
})
export class DataOrderPipe implements PipeTransform {

  transform(values: any, valorBuscar: string): any {
    if (!values || !valorBuscar) {
      return values;
    }
    return values.filter(value =>
      value.category.name.toLowerCase().indexOf(valorBuscar.toLowerCase()) !== -1
    );
  }

}

