import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertKelvinPipe } from "src/app/pipes/temperature/convert-kelvin.pipe";

@NgModule({
  declarations: [
    ConvertKelvinPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConvertKelvinPipe
  ]
})
export class PipesModule {
}
