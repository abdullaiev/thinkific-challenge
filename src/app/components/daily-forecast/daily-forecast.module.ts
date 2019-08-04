import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule, MatCardModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { DailyForecastComponent } from 'src/app/components/daily-forecast/daily-forecast.component';

@NgModule({
  declarations: [
    DailyForecastComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    FontAwesomeModule,
    PipesModule
  ],
  exports: [
    DailyForecastComponent
  ]
})
export class DailyForecastModule {
}
