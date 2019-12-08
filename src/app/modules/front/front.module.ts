import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from './front.component';
import { CoreModule } from './core/core.module';
import { StoreProductComponent } from './store-product/store-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { ProductsComponent } from './products/products.component';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [ FrontComponent,StoreProductComponent,ProductsComponent],
  imports: [
    CommonModule,
    FrontRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCb7JUS-ZKpLY7FYFuKW4eAMoStiGsaroY",
      libraries: ["places"]
    })

  ],
})
export class FrontModule { }
