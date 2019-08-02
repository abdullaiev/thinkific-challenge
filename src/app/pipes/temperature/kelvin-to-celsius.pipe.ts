import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius'
})
export class KelvinToCelsiusPipe implements PipeTransform {
  readonly ABSOLUTE_ZERO = -273.15;

  transform(value: number, ...args: any[]): any {
    return this.ABSOLUTE_ZERO + value;
  }

}
