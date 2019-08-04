import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TemperatureUnit } from 'src/app/enums/temperature.enum';

@Component({
  selector: 'app-temperature-toggle',
  templateUrl: './temperature-toggle.component.html',
  styleUrls: ['./temperature-toggle.component.scss']
})
export class TemperatureToggleComponent {
  @Input() currentTemperatureUnit: TemperatureUnit;
  @Output() updateUnits = new EventEmitter<TemperatureUnit>();
  temperatureScale = TemperatureUnit;
}
