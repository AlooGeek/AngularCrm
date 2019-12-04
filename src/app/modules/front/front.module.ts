import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from './front.component';
import { CoreModule } from './core/core.module';
import { StoreProductComponent } from './store-product/store-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ FrontComponent,StoreProductComponent],
  imports: [
    CommonModule,
    FrontRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule

  ],
})
export class FrontModule { }
