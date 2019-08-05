import { Component } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { TemperatureUnit } from 'src/app/enums/temperature.enum';
import { DailyForecast } from 'src/app/data-models/daily-forecast';
import { WeatherLocation } from 'src/app/data-models/weather-location';
import { OpenWeatherService } from 'src/app/services/open-weather/open-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  weatherLocation: WeatherLocation;
  weatherForecast: DailyForecast[];
  temperatureUnit = TemperatureUnit.CELSIUS;
  isLoadingForecast: boolean;
  selectedDayIndex = 0;

  constructor(private weatherService: OpenWeatherService) {
  }

  updateWeatherLocation(location: WeatherLocation) {
    this.weatherLocation = location;
    this.getWeatherForecast(location);
  }

  updateSelectedDay(dayIndex: number) {
    this.selectedDayIndex = dayIndex;
  }

  updateTemperatureUnits(unit: TemperatureUnit) {
    this.temperatureUnit = unit;
  }

  getWeatherForecast(location: WeatherLocation) {
    this.isLoadingForecast = true;
    this.weatherService.getFiveDayForecast(location)
      .pipe(
        finalize(() => {
          this.isLoadingForecast = false;
        })
      )
      .subscribe((response: DailyForecast[]) => {
          // Reset currently selected day.
          this.selectedDayIndex = 0;
          this.weatherForecast = response;
        }, (error: string) => {
          this.weatherForecast = null;
        }
      );
  }
}
