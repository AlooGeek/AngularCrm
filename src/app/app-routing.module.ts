import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/front/front.module#FrontModule'
  },
  {
    path: 'admin',
    loadChildren: './modules/back/back.module#BackModule'
  },
  {
    path: 'error/:status',
    component:ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error/404'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
