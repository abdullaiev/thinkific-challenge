import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material';
import { By } from '@angular/platform-browser';

import { MockComponent } from 'ng-mocks';

import { TemperatureUnit } from 'src/app/enums/temperature.enum';
import { TemperatureToggleComponent } from './temperature-toggle.component';

describe('TemperatureToggleComponent', () => {
  let component: TemperatureToggleComponent;
  let fixture: ComponentFixture<TemperatureToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TemperatureToggleComponent,
        MockComponent(MatButtonToggleGroup),
        MockComponent(MatButtonToggle)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureToggleComponent);
    component = fixture.componentInstance;
    spyOn(component.updateUnits, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update units to Celsius when Celsius button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.toggle-celsius'));
    button.triggerEventHandler('click', {});
    expect(component.updateUnits.emit).toHaveBeenCalledWith(TemperatureUnit.CELSIUS);
  });

  it('should update units to Fahrenheit when Fahrenheit button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.toggle-fahrenheit'));
    button.triggerEventHandler('click', {});
    expect(component.updateUnits.emit).toHaveBeenCalledWith(TemperatureUnit.FAHRENHEIT);
  });
});
