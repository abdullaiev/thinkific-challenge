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
  selectedDayForecast: DailyForecast;
  isLoadingForecast: boolean;
  selectedDayIndex = 0;

  constructor(private weatherService: OpenWeatherService) {
  }

  updateTemperatureUnits(unit: TemperatureUnit) {
    this.temperatureUnit = unit;
  }

  updateWeatherLocation(location: WeatherLocation) {
    this.weatherLocation = location;
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
          this.selectedDayIndex = 0;
          this.weatherForecast = response;
          this.selectedDayForecast = response[this.selectedDayIndex];
        }, (error: string) => {
          // todo: error message
          this.weatherForecast = null;
        }
      );
  }

  updateSelectedDay(dayIndex: number) {
    this.selectedDayIndex = dayIndex;
    this.selectedDayForecast = this.weatherForecast[dayIndex];
  }
}
