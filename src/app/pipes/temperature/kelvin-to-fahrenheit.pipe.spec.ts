import { KelvinToCelsiusPipe } from "src/app/pipes/temperature/kelvin-to-celsius.pipe";
import { KelvinToFahrenheitPipe } from './kelvin-to-fahrenheit.pipe';

describe('KelvinToFahrenheitPipe', () => {
  it('create an instance', () => {
    const pipe = new KelvinToFahrenheitPipe(new KelvinToCelsiusPipe());
    expect(pipe).toBeTruthy();
  });
});
