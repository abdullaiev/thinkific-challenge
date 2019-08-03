import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from "@angular/material";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from 'src/app/app.component';
import { DailyForecastModule } from "src/app/components/daily-forecast/daily-forecast.module";
import { LocationSearchModule } from "src/app/components/location-search/location-search.module";
import { TemperatureToggleModule } from "src/app/components/temperature-toggle/temperature-toggle.module";
import { UpcomingDaysForecastModule } from "src/app/components/upcoming-days-forecast/upcoming-days-forecast.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    LocationSearchModule,
    TemperatureToggleModule,
    DailyForecastModule,
    UpcomingDaysForecastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
