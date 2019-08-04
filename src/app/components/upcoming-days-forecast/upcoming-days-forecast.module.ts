import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UpcomingDaysForecastComponent } from 'src/app/components/upcoming-days-forecast/upcoming-days-forecast.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    UpcomingDaysForecastComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    PipesModule
  ],
  exports: [
    UpcomingDaysForecastComponent
  ]
})
export class UpcomingDaysForecastModule {
}
