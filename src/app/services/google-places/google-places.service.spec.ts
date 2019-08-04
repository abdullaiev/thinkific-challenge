import { ApiConfig } from 'src/config/api.config';

import { GooglePlacesService } from './google-places.service';

describe('GooglePlacesService', () => {
  let service: GooglePlacesService;
  const httpMock = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    // @ts-ignore
    global.google = {
      maps: {
        places: {
          // tslint:disable-next-line:object-literal-shorthand only-arrow-functions
          AutocompleteService: function() {
            return jasmine.createSpyObj('AutocompleteService', ['getPlacePredictions']);
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
    it('should return places matching search query', () => {
      // todo
    });
  });

  describe('method: getWeatherLocation', () => {
    it('should return geo coordinates for a place with given place_id', () => {
      // todo
    });

    it('should handle failed requests', () => {
      // todo
    });

    it('should handle invalid response', () => {
      // todo
    });
  });
});
