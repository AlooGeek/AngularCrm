import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardCoreComponent } from './dashboard-core/dashboard-core.component';
import { ProducttComponent } from './productt/productt.component';

const routes: Routes = [
  
  {path: '',component: DashboardComponent , 
  children:[ {path:'', component:DashboardCoreComponent},
             {path:'product', component:ProducttComponent}



]

},
{path:'doc' ,
   loadChildren : './document/document.module#DocumentModule' },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
