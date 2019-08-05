import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBar } from '@angular/material';
import { By } from '@angular/platform-browser';

import { MockComponent } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { DailyForecastComponent } from 'src/app/components/daily-forecast/daily-forecast.component';
import { LocationSearchComponent } from 'src/app/components/location-search/location-search.component';
import { NoContentComponent } from 'src/app/components/no-content/no-content.component';
import { TemperatureToggleComponent } from 'src/app/components/temperature-toggle/temperature-toggle.component';
import { UpcomingDaysForecastComponent } from 'src/app/components/upcoming-days-forecast/upcoming-days-forecast.component';
import { DailyForecast } from 'src/app/data-models/daily-forecast';
import { WeatherLocation } from 'src/app/data-models/weather-location';
import { TemperatureUnit } from 'src/app/enums/temperature.enum';
import { OpenWeatherService } from 'src/app/services/open-weather/open-weather.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(LocationSearchComponent),
        MockComponent(MatProgressBar),
        MockComponent(NoContentComponent),
        MockComponent(DailyForecastComponent),
        MockComponent(UpcomingDaysForecastComponent),
        MockComponent(TemperatureToggleComponent)
      ],
      providers: [
        {
          provide: OpenWeatherService,
          useValue: jasmine.createSpyObj('OpenWeatherService', ['getFiveDayForecast'])
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should fetch weather forecast when location is updated', () => {
    spyOn(app, 'getWeatherForecast');
    const locationSearch = fixture.debugElement.query(By.css('app-location-search'));
    const weatherLocation = {
      coords: {
        lat: 10,
        lon: 20
      }
    } as WeatherLocation;
    locationSearch.triggerEventHandler('selectWeatherLocation', weatherLocation);
    fixture.detectChanges();
    expect(app.weatherLocation).toEqual(weatherLocation);
    expect(app.getWeatherForecast).toHaveBeenCalledWith(weatherLocation);
  });

  it('should update currently selected day', () => {
    app.selectedDayIndex = 0;
    app.weatherForecast = [
      {
        index: 0
      } as DailyForecast,
      {
        index: 1
      } as DailyForecast
    ];
    fixture.detectChanges();
    const upcomingDaysTable = fixture.debugElement.query(By.css('app-upcoming-days-forecast'));
    upcomingDaysTable.triggerEventHandler('selectDay', 1);
    fixture.detectChanges();
    expect(app.selectedDayIndex).toEqual(1);
  });

  it('should update currently selected temperature unit', () => {
    app.weatherForecast = [
      {
        index: 0
      } as DailyForecast
    ];
    fixture.detectChanges();
    const upcomingDaysTable = fixture.debugElement.query(By.css('app-temperature-toggle'));
    upcomingDaysTable.triggerEventHandler('updateUnits', TemperatureUnit.FAHRENHEIT);
    fixture.detectChanges();
    expect(app.temperatureUnit).toEqual(TemperatureUnit.FAHRENHEIT);
  });

  describe('method: getWeatherForecast', () => {
    it('should fetch forecast and display it', () => {
      TestBed.get(OpenWeatherService).getFiveDayForecast.and.returnValue(of([
          {
            index: 0
          } as DailyForecast,
          {
            index: 1
          } as DailyForecast
        ]
      ));
      app.isLoadingForecast = true;
      app.getWeatherForecast({} as WeatherLocation);
      expect(app.isLoadingForecast).toBeFalsy();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('app-daily-forecast'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('app-upcoming-days-forecast'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('app-temperature-toggle'))).toBeTruthy();
    });

    it('should clear current forecast upon request failure', () => {
      app.weatherForecast = [
        {
          index: 0
        } as DailyForecast,
        {
          index: 1
        } as DailyForecast
      ];
      TestBed.get(OpenWeatherService).getFiveDayForecast.and.returnValue(throwError('500'));
      app.getWeatherForecast({} as WeatherLocation);
      expect(app.weatherForecast).toEqual(null);
    });
  });
});
