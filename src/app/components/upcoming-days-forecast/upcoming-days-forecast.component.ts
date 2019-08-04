import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TemperatureUnit } from 'src/app/enums/temperature.enum';
import { DailyForecast } from 'src/app/data-models/daily-forecast';
import { OpenWeatherToFontAwesome } from 'src/app/mappings/icon.mappings';

@Component({
  selector: 'app-upcoming-days-forecast',
  templateUrl: './upcoming-days-forecast.component.html',
  styleUrls: ['./upcoming-days-forecast.component.scss']
})
export class UpcomingDaysForecastComponent implements OnInit {
  @Input() temperatureUnit: TemperatureUnit;
  @Input() upcomingDaysForecast: DailyForecast[];
  @Input() selectedDayIndex: number;
  @Output() selectDay = new EventEmitter<number>();
  displayedColumns: string[] = ['day', 'date', 'conditions', 'high', 'low'];
  openWeatherToFontAwesome = OpenWeatherToFontAwesome;

  constructor() { }

  ngOnInit() {
  }

  selectDayByIndex(index: number) {
    this.selectDay.emit(index);
  }
}
