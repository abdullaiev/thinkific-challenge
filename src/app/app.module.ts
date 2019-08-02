import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faLocationArrow,
  faSnowflake,
  faSun
} from "@fortawesome/free-solid-svg-icons";

import { KelvinToCelsiusPipe } from './pipes/temperature/kelvin-to-celsius.pipe';
import { KelvinToFahrenheitPipe } from './pipes/temperature/kelvin-to-fahrenheit.pipe';

import { AppComponent } from 'src/app/app.component';
import { DailyForecastModule } from "src/app/components/daily-forecast/daily-forecast.module";
import { LocationGetterModule } from "src/app/components/location-getter/location-getter.module";
import { LocationSearchModule } from "src/app/components/location-search/location-search.module";
import { TemperatureToggleModule } from "src/app/components/temperature-toggle/temperature-toggle.module";
import { UpcomingDaysForecastModule } from "src/app/components/upcoming-days-forecast/upcoming-days-forecast.module";

@NgModule({
  declarations: [
    AppComponent,
    KelvinToCelsiusPipe,
    KelvinToFahrenheitPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    LocationSearchModule,
    LocationGetterModule,
    TemperatureToggleModule,
    DailyForecastModule,
    UpcomingDaysForecastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    library.add(faSun);
    library.add(faCloudSun);
    library.add(faCloudSunRain);
    library.add(faCloudShowersHeavy);
    library.add(faSnowflake);
    library.add(faLocationArrow);
  }
}
