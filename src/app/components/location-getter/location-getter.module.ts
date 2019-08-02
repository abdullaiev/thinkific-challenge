import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { LocationGetterComponent } from "src/app/components/location-getter/location-getter.component";

@NgModule({
  declarations: [
    LocationGetterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule
  ],
  exports: [
    LocationGetterComponent
  ]
})
export class LocationGetterModule {
}
