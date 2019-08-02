import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingDaysForecastComponent } from './upcoming-days-forecast.component';

describe('UpcomingDaysForecastComponent', () => {
  let component: UpcomingDaysForecastComponent;
  let fixture: ComponentFixture<UpcomingDaysForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingDaysForecastComponent ]
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
});
