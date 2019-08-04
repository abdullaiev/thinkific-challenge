import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { NoContentComponent } from 'src/app/components/no-content/no-content.component';

@NgModule({
  declarations: [
    NoContentComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    NoContentComponent
  ]
})
export class NoContentModule { }
