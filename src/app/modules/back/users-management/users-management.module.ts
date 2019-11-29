import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { ClaimsComponent } from './claims/claims.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, RolesComponent, ClaimsComponent],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    FormsModule
  ]
})
export class UsersManagementModule { }
