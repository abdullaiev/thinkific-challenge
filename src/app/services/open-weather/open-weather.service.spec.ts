import { of } from 'rxjs';

import { WeatherLocation } from 'src/app/data-models/weather-location';
import { ApiConfig } from 'src/config/api.config';
import { OpenWeatherService } from './open-weather.service';

fdescribe('OpenWeatherService', () => {
  let service: OpenWeatherService;
  const httpMock = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    service = new OpenWeatherService(httpMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method: getUrl', () => {
    it('should construct URL with given endpoint and query params', () => {
      const url = OpenWeatherService.getUrl('endpoint', {
        param1: 'value1',
        param2: 'value2'
      });
      expect(url).toEqual(`${ApiConfig.OpenWeather.API}endpoint?APPID=${ApiConfig.OpenWeather.APP_ID}&param1=value1&param2=value2`);
    });
  });

  describe('method: getFiveDayForecast', () => {
    const testUrl = 'test-url';
    let location;
    let mockData;
    let mockResponse;

    beforeEach(() => {
      spyOn(OpenWeatherService, 'getUrl').and.returnValue(testUrl);
      location = {
        coords: {
          lat: 10,
          lon: 20
        }
      } as WeatherLocation;
      mockData = [];
    });

    it('should retrieve forecast from 2.5 endpoint', () => {
      mockResponse = {
        cod: '200',
        list: mockData
      };
      httpMock.get.and.returnValue(of(mockResponse));
      service.getFiveDayForecast(location).subscribe(() => {
        expect(OpenWeatherService.getUrl).toHaveBeenCalledWith('data/2.5/forecast', location.coords);
        expect(httpMock.get).toHaveBeenCalledWith(testUrl);
      }, (error) => {
        expect(true).toBeFalsy(error);
      });
    });

    // it('should parse response and return data ready for UI consumption', () => {
    //  // todo
    // });
    //
    it('should handle errors', () => {
      mockResponse = {
        cod: '500'
      };
      httpMock.get.and.returnValue(of(mockResponse));
      service.getFiveDayForecast(location).subscribe(() => {
        expect(true).toBeFalsy('Observable should not have succeeded.');
      }, (error) => {
        expect(error.toString().includes('Forecast request failed')).toBeTruthy();
      });
    });
  });
});
