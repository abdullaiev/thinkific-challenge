import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-days-forecast',
  templateUrl: './upcoming-days-forecast.component.html',
  styleUrls: ['./upcoming-days-forecast.component.scss']
})
export class UpcomingDaysForecastComponent implements OnInit {
  displayedColumns: string[] = ['name', 'conditions', 'high', 'low'];
  dataSource = [
    {
      name: 'Monday',
      conditions: 'sunny',
      high: 30,
      low: 15
    },
    {
      name: 'Tuesday',
      conditions: 'sunny',
      high: 30,
      low: 15
    },
    {
      name: 'Wednesday',
      conditions: 'cloudy',
      high: 30,
      low: 15
    },
    {
      name: 'Thursday',
      conditions: 'rainy',
      high: 30,
      low: 15
    },
    {
      name: 'Friday',
      conditions: 'sunny',
      high: 30,
      low: 15
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
