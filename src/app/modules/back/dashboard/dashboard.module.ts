import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProducttComponent } from './productt/productt.component';
import { DashboardCoreComponent } from './dashboard-core/dashboard-core.component';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DashboardComponent,ProducttComponent, DashboardCoreComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
	FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class DashboardModule { }
