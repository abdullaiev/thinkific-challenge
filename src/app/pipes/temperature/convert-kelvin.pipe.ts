import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnit } from "src/app/enums/temperature.enum";

@Pipe({
  name: 'convertKelvinTo'
})
export class ConvertKelvinPipe implements PipeTransform {
  readonly ABSOLUTE_ZERO = -273.15;

  constructor() {
  }

  transform(value: any, unit: TemperatureUnit): any {
    let celsius = this.ABSOLUTE_ZERO + value;

    if (unit === TemperatureUnit.CELSIUS) {
      return celsius;
    } else if (unit === TemperatureUnit.FAHRENHEIT) {
      return celsius * 9 / 5 + 32;
    } else {
      throw new Error(`ConvertKelvinPipe error: ${unit} unit is not supported.`);
    }
  }
}
