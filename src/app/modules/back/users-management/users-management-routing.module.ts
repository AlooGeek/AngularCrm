import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { ClaimsComponent } from './claims/claims.component';

const routes: Routes = [
  {
    path:'',
    component:UsersComponent,
  },
  {
    path:'roles',
    component:RolesComponent,
  },
  {
    path:'claims',
    component:ClaimsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
