import { of } from 'rxjs';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;

import { ApiConfig } from 'src/config/api.config';
import { WeatherLocation } from 'src/app/data-models/weather-location';
import { GooglePlacesService } from './google-places.service';

describe('GooglePlacesService', () => {
  let service: GooglePlacesService;
  let mockAutocompletePredictions: AutocompletePrediction[];
  const httpMock = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    mockAutocompletePredictions = [
      {
        place_id: '123',
        description: 'Vancouver, BC, Canada'
      } as AutocompletePrediction,
      {
        place_id: '456',
        description: 'Vannes, France'
      } as AutocompletePrediction
    ];

    // @ts-ignore
    global.google = {
      maps: {
        places: {
          // tslint:disable-next-line:object-literal-shorthand only-arrow-functions
          AutocompleteService: function() {
          }
        }
      }
    };
    service = new GooglePlacesService(httpMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method: getUrl', () => {
    it('should construct URL with given endpoint and query params', () => {
      const url = GooglePlacesService.getUrl('endpoint', {param: 'value'});
      expect(url).toEqual(`${ApiConfig.GoogleMaps.API}endpoint?key=${ApiConfig.GoogleMaps.API_KEY}&param=value`);
    });
  });

  describe('method: getPlaces', () => {
    beforeEach(() => {
      const spy = jasmine.createSpyObj('AutocompleteService', ['getPlacePredictions']);
      spy.getPlacePredictions.and.callFake((request, callback) => {
        // Emulate network call. Otherwise, mock data will be returned before observable subscription.
        setTimeout(() => {
          callback(mockAutocompletePredictions);
        });
      });
      service.googleAutocomplete = spy;
    });

    it('should return places matching search query', (done) => {
      service.getPlaces('van').subscribe((predictions: AutocompletePrediction[]) => {
        expect(predictions.length).toEqual(2);
        expect(predictions[0].place_id).toEqual('123');
        expect(predictions[1].place_id).toEqual('456');
        done();
      }, (error) => {
        fail(error);
        done();
      });
    });
  });

  describe('method: getWeatherLocation', () => {
    let mockPlace: AutocompletePrediction;

    beforeEach(() => {
      mockPlace = {
        place_id: 'mock-place',
        structured_formatting: {
          main_text: 'Test City',
          secondary_text: 'Test Province'
        }
      } as AutocompletePrediction;
    });

    it('should return geo coordinates for a place with given place_id', () => {
      httpMock.get.and.returnValue(of({
        status: 'OK',
        results: [
          {
            geometry: {
              location: {
                lat: 12,
                lng: 24
              }
            }
          }
        ]
      }));
      service.getWeatherLocation(mockPlace).subscribe((location: WeatherLocation) => {
        expect(location.coords.lat).toEqual(12);
        expect(location.coords.lon).toEqual(24);
        expect(location.description).toEqual('Test City');
        expect(location.secondaryDescription).toEqual('Test Province');
      }, (error) => {
        fail(error);
      });
    });

    it('should handle failed requests', () => {
      httpMock.get.and.returnValue(of({
        status: 'ERR',
        results: []
      }));
      service.getWeatherLocation(mockPlace).subscribe((location: WeatherLocation) => {
        fail('getWeatherLocation should succeed if status is not OK');
      }, (error) => {
        expect(error.toString()).toContain('geocode request failed');
      });
    });

    it('should handle invalid response', () => {
      httpMock.get.and.returnValue(of({
        status: 'OK'
      }));
      service.getWeatherLocation(mockPlace).subscribe((location: WeatherLocation) => {
        fail('getWeatherLocation should succeed if status is there is no geometry object');
      }, (error) => {
        expect(error.toString()).toContain('geometry property is missing');
      });
    });
  });
});
