import { Component, Input } from '@angular/core';

import { TemperatureUnit } from 'src/app/enums/temperature.enum';
import { DailyForecast, ThreeHourForecast } from 'src/app/data-models/daily-forecast';
import { WeatherLocation } from 'src/app/data-models/weather-location';
import { OpenWeatherToFontAwesome} from 'src/app/mappings/icon.mappings';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent {
  @Input() temperatureUnit: TemperatureUnit;
  @Input() weatherLocation: WeatherLocation;
  @Input()
  set dailyForecast(value: DailyForecast) {
    if (value) {
      this.forecast = value;
      // Select the first available partition for the first day.
      // All subsequent days should display noon partition by default.
      const index = this.forecast.index === 0 ? 0 : 4;
      this.currentPartition = this.forecast.threeHourPartitions[index];
    }
  }
  currentPartition: ThreeHourForecast;
  forecast: DailyForecast;
  openWeatherToFontAwesome = OpenWeatherToFontAwesome;
}
