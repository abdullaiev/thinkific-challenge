import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnit } from 'src/app/enums/temperature.enum';

@Pipe({
  name: 'convertKelvinTo'
})
export class ConvertKelvinPipe implements PipeTransform {
  readonly ABSOLUTE_ZERO = -273.15;

  constructor(private numberPipe: DecimalPipe) {
  }

  transform(value: any, outputUnit: TemperatureUnit): any {
    if (value < 0) {
      throw new Error(`[ConvertKelvinPipe] ERROR: ${value} is smaller than the absolute zero.`);
    }

    const celsius = this.ABSOLUTE_ZERO + value;
    let temperature;

    if (outputUnit === TemperatureUnit.CELSIUS) {
      temperature = celsius;
    } else if (outputUnit === TemperatureUnit.FAHRENHEIT) {
      temperature = celsius * 9 / 5 + 32;
    } else {
      throw new Error(`[ConvertKelvinPipe] ERROR: ${outputUnit} unit is not supported.`);
    }

    return this.numberPipe.transform(temperature, '1.0-0');
  }
}
