import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ConvertKelvinPipe } from 'src/app/pipes/temperature/convert-kelvin.pipe';

@NgModule({
  providers: [
    DecimalPipe
  ],
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
