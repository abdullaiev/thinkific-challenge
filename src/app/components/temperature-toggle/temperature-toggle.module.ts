import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from "@angular/material";
import { TemperatureToggleComponent } from "src/app/components/temperature-toggle/temperature-toggle.component";


@NgModule({
  declarations: [
    TemperatureToggleComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule
  ],
  exports: [
    TemperatureToggleComponent
  ]
})
export class TemperatureToggleModule {
}
