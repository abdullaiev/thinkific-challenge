import { Pipe, PipeTransform } from '@angular/core';
import { KelvinToCelsiusPipe } from "src/app/pipes/temperature/kelvin-to-celsius.pipe";

@Pipe({
  name: 'kelvinToFahrenheit'
})
export class KelvinToFahrenheitPipe implements PipeTransform {

  constructor(private kelvinToCelsiusPipe: KelvinToCelsiusPipe) {
  }

  transform(value: any, ...args: any[]): any {
    let celsius = this.kelvinToCelsiusPipe.transform(value);
    return celsius * 9 / 5 + 32;
  }
}
