import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProducttComponent } from './productt/productt.component';
import { DashboardCoreComponent } from './dashboard-core/dashboard-core.component';


@NgModule({
  declarations: [DashboardComponent,ProducttComponent, DashboardCoreComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
