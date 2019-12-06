import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackRoutingModule } from './back-routing.module';
import { BackComponent } from './back.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [BackComponent, HeaderComponent],
  imports: [
    CommonModule,
    BackRoutingModule
  ]
})
export class BackModule { }
