import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material";

import { DailyForecastComponent } from "src/app/components/daily-forecast/daily-forecast.component";

@NgModule({
  declarations: [
    DailyForecastComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    DailyForecastComponent
  ]
})
export class DailyForecastModule {
}
