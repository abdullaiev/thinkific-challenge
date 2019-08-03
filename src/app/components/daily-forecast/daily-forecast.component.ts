import { Component, Input, OnInit } from '@angular/core';
import { TemperatureUnit } from "src/app/enums/temperature.enum";
import { DailyForecast, ThreeHourForecast } from "src/app/models/daily-forecast";
import { WeatherLocation } from "src/app/models/weather-location";

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {
  @Input() weatherLocation: WeatherLocation;
  @Input() temperatureUnit: TemperatureUnit;
  @Input()
  set dailyForecast(value: DailyForecast) {
    this._dailyForecast = value;
    if (this._dailyForecast) {
      this.currentThreeHourPartition = this._dailyForecast.threeHourPartitions[0];
    }
  }
  _dailyForecast: DailyForecast
  currentThreeHourPartition: ThreeHourForecast;
  selectedPartitionIndex = 0;

  constructor() { }

  ngOnInit() {
  }
}
