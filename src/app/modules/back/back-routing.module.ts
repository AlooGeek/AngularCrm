import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProducttComponent } from "./dashboard/productt/productt.component";
import { BackComponent } from "./back.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackRoutingModule {}
