import { ConvertKelvinPipe } from './convert-kelvin.pipe';

describe('ConvertKelvinPipe', () => {
  it('create an instance', () => {
    const pipe = new ConvertKelvinPipe(new KelvinToCelsiusPipe());
    expect(pipe).toBeTruthy();
  });
});
