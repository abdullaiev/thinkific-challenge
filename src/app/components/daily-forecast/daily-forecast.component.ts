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
  @Input() weatherLocation: WeatherLocation;
  @Input() temperatureUnit: TemperatureUnit;
  @Input()
  set dailyForecast(value: DailyForecast) {
    this._dailyForecast = value;
    if (this._dailyForecast) {
      this.selectedPartitionIndex = 0;
      this.currentPartition = this._dailyForecast.threeHourPartitions[this.selectedPartitionIndex];
    }
  }
  _dailyForecast: DailyForecast;
  currentPartition: ThreeHourForecast;
  selectedPartitionIndex = 0;
  openWeatherToFontAwesome = OpenWeatherToFontAwesome;
}
