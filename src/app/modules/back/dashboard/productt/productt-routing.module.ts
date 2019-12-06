import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProducttComponent } from './productt.component';

const routes: Routes = [

  {path:'product', component:ProducttComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducttRoutingModule { }
