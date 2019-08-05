import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggle, MatButtonToggleGroup, MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MockComponent } from 'ng-mocks';
import { DailyForecast } from 'src/app/data-models/daily-forecast';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { DailyForecastComponent } from './daily-forecast.component';

describe('DailyForecastComponent', () => {
  let component: DailyForecastComponent;
  let fixture: ComponentFixture<DailyForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DailyForecastComponent,
        MockComponent(MatCard),
        MockComponent(MatCardTitle),
        MockComponent(MatCardSubtitle),
        MockComponent(MatCardContent),
        MockComponent(FaIconComponent),
        MockComponent(MatButtonToggleGroup),
        MockComponent(MatButtonToggle)
      ],
      imports: [
        PipesModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the first available three hour partition for the first day of the forecast', () => {
    component.dailyForecast = {
      index: 0,
      threeHourPartitions: [
        {
          dt_txt: '2019-08-05 11:00'
        }
      ]
    } as DailyForecast;
    expect(component.currentPartition.dt_txt).toEqual('2019-08-05 11:00');
  });

  it('should use the afternoon partition for the upcoming days', () => {
    const forecast = {
      index: 0,
      threeHourPartitions: new Array(5).fill({
        time: ''
      })
    } as DailyForecast;
    forecast.threeHourPartitions[4].dt_txt = '12:00';
    component.dailyForecast = forecast;
    expect(component.currentPartition.dt_txt).toEqual('12:00');
  });

  it('should not attempt to update the selected partition if forecast is not provided', () => {
    expect(() => {
      component.dailyForecast = null;
    }).not.toThrow();
  });
});
