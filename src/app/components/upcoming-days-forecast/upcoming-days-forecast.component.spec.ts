import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockComponent } from 'ng-mocks';

import { DailyForecast } from 'src/app/data-models/daily-forecast';
import { TemperatureUnit } from 'src/app/enums/temperature.enum';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UpcomingDaysForecastComponent } from './upcoming-days-forecast.component';

describe('UpcomingDaysForecastComponent', () => {
  let component: UpcomingDaysForecastComponent;
  let fixture: ComponentFixture<UpcomingDaysForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UpcomingDaysForecastComponent,
        MockComponent(FaIconComponent)
      ],
      imports: [
        MatTableModule,
        PipesModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingDaysForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectDay event when a row is clicked', () => {
    component.temperatureUnit = TemperatureUnit.CELSIUS;
    component.upcomingDaysForecast = [
      {
        index: 0,
        temperature: {
          min: 290,
          max: 300
        },
        weather: {
          icon: '03d',
          description: 'cloud'
        }
      } as DailyForecast,
      {
        index: 1,
        temperature: {
          min: 292,
          max: 298
        },
        weather: {
          icon: '09d',
          description: 'heavy showers'
        }
      } as DailyForecast
    ];
    fixture.detectChanges();
    spyOn(component.selectDay, 'emit');
    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toEqual(2);
    rows[1].triggerEventHandler('click', {});
    expect(component.selectedDayIndex).toEqual(1);
    expect(component.selectDay.emit).toHaveBeenCalledWith(1);
  });
});
