import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DailyForecast, WeatherCondition } from 'src/app/data-models/daily-forecast';
import { WeatherLocation } from 'src/app/data-models/weather-location';
import { ApiConfig } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  constructor(private http: HttpClient) {
  }

  static getUrl(endpoint: string, params: object) {
    let url = `${ApiConfig.OpenWeather.API}${endpoint}?APPID=${ApiConfig.OpenWeather.APP_ID}`;

    for (const key in params) {
      url += `&${key}=${params[key]}`;
    }

    return url;
  }

  static parseHourlyForecast(forecast): DailyForecast[] {
    const dateMap = {};
    const days: DailyForecast[] = [];

    // Group three hour forecast partitions by date.
    for (const partition of forecast.list) {
      const [date, time] = partition.dt_txt.split(' ');

      if (!dateMap[date]) {
        dateMap[date] = [];
      }

      partition.time = time;
      dateMap[date].push(partition);
    }

    // Store each day's min and max temperature as well as most frequent weather condition.
    for (const date in dateMap) {
      const partitions = dateMap[date];
      let min = Infinity;
      let max = -Infinity;

      for (const partition of partitions) {
        if (partition.main.temp_min < min) {
          min = partition.main.temp_min;
        }

        if (partition.main.temp_max > max) {
          max = partition.main.temp_max;
        }
      }

      days.push({
        date,
        temperature: {min, max},
        threeHourPartitions: partitions
      } as DailyForecast);
    }

    // Get most frequent daily weather icon for each day.
    for (const day of days) {
      const conditions = day.threeHourPartitions.map(partition => {
        // Retrieve icon name and condition description.
        let {icon, description} = partition.weather[0];

        if (icon && icon[icon.length - 1] === 'n') {
          // Replace a night icon with a daylight icon.
          icon = icon.slice(0, icon.length - 1) + 'd';
        }

        return {icon, description};
      });

      // Use a hash map to calculate frequency of each condition during the day.
      const iconMap = {};
      for (const condition of conditions) {
        if (iconMap[condition.icon]) {
          iconMap[condition.icon]++;
        } else {
          iconMap[condition.icon] = 1;
        }
      }

      // Sort daily conditions such that the most frequent condition is the first item of the array.
      const iconsSortedByFrequency = Object.keys(iconMap).sort((icon1, icon2) => {
        return iconMap[icon2] - iconMap[icon1];
      });

      day.weather = conditions.find((condition: WeatherCondition) => {
        return condition.icon === iconsSortedByFrequency[0];
      });
    }

    // Make sure that the first day has partitions for full 24 hours.
    const firstDayPartitions = days[0].threeHourPartitions.length;
    const fullDayPartitions = 7;

    if (firstDayPartitions < fullDayPartitions) {
      const delta = fullDayPartitions - firstDayPartitions;
      days[0].threeHourPartitions = days[0].threeHourPartitions.concat(days[1].threeHourPartitions.slice(0, delta + 1));
    }

    days[0].threeHourPartitions[0].dt_txt = new Date().toISOString();

    return days.slice(0, 5);
  }

  getFiveDayForecast(location: WeatherLocation): Observable<DailyForecast[]> {
    const url = OpenWeatherService.getUrl('data/2.5/forecast', location.coords);
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.cod !== '200') {
          throw new Error(`[OpenWeatherService] ERROR: Forecast request failed for
                                  lat: ${location.coords.lat}, lon: ${location.coords.lon}`);
        }
        return response;
      }),
      map((response: any) => {
        return OpenWeatherService.parseHourlyForecast(response);
      })
    );
  }
}
