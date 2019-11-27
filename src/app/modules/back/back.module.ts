import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRoutingModule } from './back-routing.module';
import { BackComponent } from './back.component';
import { ProducttComponent } from './dashboard/productt/productt.component';

@NgModule({
  declarations: [BackComponent],
  imports: [
    CommonModule,
    BackRoutingModule
  ]
})
export class BackModule { }
