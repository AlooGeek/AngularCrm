import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProducttComponent } from "./dashboard/productt/productt.component";
import { BackComponent } from "./back.component";

const routes: Routes = [
  {
    path: '',
    component: BackComponent,
    children: [      
      {
        path: '',
        loadChildren: "./users-management/users-management.module#UsersManagementModule"
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackRoutingModule {}
