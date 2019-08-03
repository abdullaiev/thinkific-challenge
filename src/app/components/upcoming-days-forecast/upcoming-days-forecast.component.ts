import { Component, Input, OnInit } from '@angular/core';
import { TemperatureUnit } from "src/app/enums/temperature.enum";
import { DailyForecast } from "src/app/models/daily-forecast";

@Component({
  selector: 'app-upcoming-days-forecast',
  templateUrl: './upcoming-days-forecast.component.html',
  styleUrls: ['./upcoming-days-forecast.component.scss']
})
export class UpcomingDaysForecastComponent implements OnInit {
  @Input() currentTemperatureUnit: TemperatureUnit;
  @Input() upcomingDaysForecast: DailyForecast[];
  displayedColumns: string[] = ['date', 'conditions', 'high', 'low'];

  constructor() { }

  ngOnInit() {
  }

}
