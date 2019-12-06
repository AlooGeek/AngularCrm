import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontComponent } from './front.component';
import { LoginformComponent } from './core/loginform/loginform.component';
import { StoreProductComponent } from './store-product/store-product.component';

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children:[
      {
        path: '',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path:'authenticate',
        component:LoginformComponent
      },
      {
        path: 'billing',
        loadChildren: './billing/billing.module#BillingModule'
      },
      {
        path:'store',
        component:StoreProductComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
