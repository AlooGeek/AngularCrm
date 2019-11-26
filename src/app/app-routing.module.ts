import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: './modules/front/front.module#FrontModule'
  },
  {
    path: 'dashboard',
    loadChildren: './modules/back/back.module#BackModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
