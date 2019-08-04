import { DecimalPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { TemperatureUnit } from 'src/app/enums/temperature.enum';

import { ConvertKelvinPipe } from './convert-kelvin.pipe';

describe('ConvertKelvinPipe', () => {
  let pipe: PipeTransform;

  beforeEach(() => {
    pipe = new ConvertKelvinPipe(new DecimalPipe('en-CA'));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should handle absolute minimum', () => {
    const celsius = pipe.transform(0, TemperatureUnit.CELSIUS);
    expect(celsius).toEqual('-273');
  });

  it('should throw an error for values smaller than 0', () => {
    expect(() => {
      pipe.transform(-0.01, TemperatureUnit.CELSIUS);
    }).toThrow();
  });

  describe('convert to Celsius', () => {
    it('should handle positive values', () => {
      const celsius = pipe.transform(274.15, TemperatureUnit.CELSIUS);
      expect(celsius).toEqual('1');
    });

    it('should handle negative values', () => {
      const celsius = pipe.transform(272.15, TemperatureUnit.CELSIUS);
      expect(celsius).toEqual('-1');
    });

    it('should correctly round down positive values', () => {
      const celsius = pipe.transform(273.3, TemperatureUnit.CELSIUS);
      expect(celsius).toEqual('0');
    });

    it('should correctly round up positive values', () => {
      const celsius = pipe.transform(274, TemperatureUnit.CELSIUS);
      expect(celsius).toEqual('1');
    });

    it('should correctly round down negative values', () => {
      const celsius = pipe.transform(272.3, TemperatureUnit.CELSIUS);
      expect(celsius).toEqual('-1');
    });

    it('should correctly round up negative values', () => {
      const celsius = pipe.transform(273, TemperatureUnit.CELSIUS);
      expect(celsius).toEqual('0');
    });
  });

  describe('convert to Fahrenheit', () => {
    it('should handle positive values', () => {
      const fahrenheit = pipe.transform(273.15, TemperatureUnit.FAHRENHEIT);
      expect(fahrenheit).toEqual('32');
    });

    // todo: update tests below.
    // it('should handle negative values', () => {
    //   const fahrenheit = pipe.transform(272.15, TemperatureUnit.FAHRENHEIT);
    //   expect(fahrenheit).toEqual(-1);
    // });
    //
    // it('should correctly round down positive values', () => {
    //   const fahrenheit = pipe.transform(273.3, TemperatureUnit.FAHRENHEIT);
    //   expect(fahrenheit).toEqual(0);
    // });
    //
    // it('should correctly round up positive values', () => {
    //   const fahrenheit = pipe.transform(274, TemperatureUnit.FAHRENHEIT);
    //   expect(fahrenheit).toEqual(1);
    // });
    //
    // it('should correctly round down negative values', () => {
    //   const fahrenheit = pipe.transform(272.3, TemperatureUnit.FAHRENHEIT);
    //   expect(fahrenheit).toEqual(-1);
    // });
    //
    // it('should correctly round up negative values', () => {
    //   const fahrenheit = pipe.transform(273, TemperatureUnit.FAHRENHEIT);
    //   expect(fahrenheit).toEqual(0);
    // });
  });
});
