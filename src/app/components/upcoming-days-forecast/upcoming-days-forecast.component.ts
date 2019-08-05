import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TemperatureUnit } from 'src/app/enums/temperature.enum';
import { DailyForecast } from 'src/app/data-models/daily-forecast';
import { OpenWeatherToFontAwesome } from 'src/app/mappings/icon.mappings';

@Component({
  selector: 'app-upcoming-days-forecast',
  templateUrl: './upcoming-days-forecast.component.html',
  styleUrls: ['./upcoming-days-forecast.component.scss']
})
export class UpcomingDaysForecastComponent {
  @Input() temperatureUnit: TemperatureUnit;
  @Input() upcomingDaysForecast: DailyForecast[];
  @Output() selectDay = new EventEmitter<number>();
  selectedDayIndex = 0;
  displayedColumns: string[] = ['day', 'date', 'conditions', 'high', 'low'];
  openWeatherToFontAwesome = OpenWeatherToFontAwesome;

  selectDayByIndex(index: number) {
    this.selectedDayIndex = index;
    this.selectDay.emit(index);
  }
}
