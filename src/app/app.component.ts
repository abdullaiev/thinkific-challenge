import { Component } from '@angular/core';
import { finalize } from "rxjs/operators";
import { TemperatureUnit } from "src/app/enums/temperature.enum";
import { DailyForecast } from "src/app/models/daily-forecast";
import { WeatherLocation } from "src/app/models/weather-location";
import { OpenWeatherService } from "src/app/services/open-weather/open-weather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  currentWeatherLocation: WeatherLocation;
  currentForecast: DailyForecast[];
  currentTemperatureUnit = TemperatureUnit.CELSIUS;
  isLoadingForecast: boolean;

  constructor(private weatherService: OpenWeatherService) {
  }

  updateCurrentUnit(unit: TemperatureUnit) {
    this.currentTemperatureUnit = unit;
  }

  updateWeatherLocation(location: WeatherLocation) {
    this.currentWeatherLocation = location;
    this.getWeatherForecast(location);
  }

  getWeatherForecast(location: WeatherLocation) {
    this.isLoadingForecast = true;
    this.weatherService.getFiveDayForecast(location)
      .pipe(
        finalize(() => {
          this.isLoadingForecast = false;
        })
      )
      .subscribe((response) => {
          this.currentForecast = response;
          console.log("RECEIVED");
        }, (error: string) => {
          // todo: error message
          this.currentForecast = null;
        }
      );
  }
}
