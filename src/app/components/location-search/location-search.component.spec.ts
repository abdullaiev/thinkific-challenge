import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent, MatFormField } from '@angular/material';

import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { WeatherLocation } from 'src/app/data-models/weather-location';

import { GooglePlacesService } from 'src/app/services/google-places/google-places.service';
import { LocationSearchComponent } from './location-search.component';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;

const getMockPredictions = (): AutocompletePrediction[] => {
  return [
    {
      place_id: 'ABC'
    } as AutocompletePrediction,
    {
      place_id: 'DEF',
      description: 'Vancouver, BC'
    } as AutocompletePrediction
  ];
};

describe('LocationSearchComponent', () => {
  let component: LocationSearchComponent;
  let fixture: ComponentFixture<LocationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocationSearchComponent,
        MockComponent(MatFormField)
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      providers: [
        {
          provide: GooglePlacesService,
          useValue: jasmine.createSpyObj('GooglePlacesService', ['getPlaces', 'getWeatherLocation'])
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('method: subscribeToInputChanges', () => {
    let mockPredictions: AutocompletePrediction[];

    beforeEach(() => {
      mockPredictions = getMockPredictions();
      TestBed.get(GooglePlacesService).getPlaces.and.returnValue(of(mockPredictions));
    });

    it('should listen to search input value changes', fakeAsync(() => {
      fixture.detectChanges();
      component.placeControl.setValue('Vanc');
      tick(200);
      expect(TestBed.get(GooglePlacesService).getPlaces).toHaveBeenCalledWith('Vanc');
      expect(component.predictions).toEqual(mockPredictions);
    }));

    it('should empty search autocomplete predictions is search query has been cleared', fakeAsync(() => {
      component.predictions = getMockPredictions();
      fixture.detectChanges();
      component.placeControl.setValue('');
      tick(200);
      expect(TestBed.get(GooglePlacesService).getPlaces).not.toHaveBeenCalled();
      expect(component.predictions.length).toEqual(0);
    }));

    it('should debounce user input with 200ms delay', fakeAsync(() => {
      fixture.detectChanges();
      component.placeControl.setValue('Vanc');
      tick(100);
      component.placeControl.setValue('Vancouver');
      tick(200);
      expect(TestBed.get(GooglePlacesService).getPlaces).not.toHaveBeenCalledWith('Vanc');
      expect(TestBed.get(GooglePlacesService).getPlaces).toHaveBeenCalledWith('Vancouver');
    }));
  });

  describe('method: onOptionSelected', () => {
    it('should find the matching autocomplete prediction and get its geo coordinates', () => {
      const mockWeatherLocation = {
        description: 'Vancouver',
        secondaryDescription: 'BC, Canada',
        coords: {
          lat: 49.2827,
          lon: 123.1207
        }
      } as WeatherLocation;
      TestBed.get(GooglePlacesService).getWeatherLocation.and.returnValue(of(mockWeatherLocation));
      spyOn(component.selectWeatherLocation, 'emit');
      component.predictions = getMockPredictions();
      component.onOptionSelected({
        option: {
          value: 'Vancouver, BC'
        }
      } as MatAutocompleteSelectedEvent);
      expect(TestBed.get(GooglePlacesService).getWeatherLocation).toHaveBeenCalledWith(component.predictions[1]);
      expect(component.selectWeatherLocation.emit).toHaveBeenCalledWith(mockWeatherLocation);
    });
  });

  describe('method: trackByFunction', () => {
    it('should use place_id property for tracking', () => {
      const testPrediction = {
        place_id: 'ABC'
      } as AutocompletePrediction;
      expect(component.trackByFunction(0, testPrediction)).toEqual('ABC');
    });

    it('should return null for invalid inputs', () => {
      expect(component.trackByFunction(0, undefined)).toEqual(null);
    });
  });
});
