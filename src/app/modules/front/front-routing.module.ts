import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontComponent } from './front.component';
import { LoginformComponent } from './core/loginform/loginform.component';
import { StoreProductComponent } from './store-product/store-product.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { ProductsComponent } from './products/products.component';

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
        path:'register',
        component:RegistrationComponent
      },
      {
        path: 'billing',
        loadChildren: './billing/billing.module#BillingModule'
      },
      {
        path:'store',
        component:StoreProductComponent
      },
      {
        path:'products/:ids',
        component:ProductsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
