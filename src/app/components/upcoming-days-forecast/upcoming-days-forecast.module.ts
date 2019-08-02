import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material";

import { UpcomingDaysForecastComponent } from "src/app/components/upcoming-days-forecast/upcoming-days-forecast.component";

@NgModule({
  declarations: [
    UpcomingDaysForecastComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    UpcomingDaysForecastComponent
  ]
})
export class UpcomingDaysForecastModule {
}
