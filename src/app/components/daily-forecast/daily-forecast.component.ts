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
  @Input() currentWeatherLocation: WeatherLocation;
  @Input() currentTemperatureUnit: TemperatureUnit;
  @Input() forecast: DailyForecast;
  @Input() currentThreeHourPartition: ThreeHourForecast;

  constructor() { }

  ngOnInit() {
    this.currentThreeHourPartition = this.forecast.threeHourPartitions[0];
  }
}
