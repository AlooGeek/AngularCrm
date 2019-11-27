import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRoutingModule } from './back-routing.module';
import { BackComponent } from './back.component';

@NgModule({
  declarations: [BackComponent],
  imports: [
    CommonModule,
    BackRoutingModule
  ]
})
export class BackModule { }
