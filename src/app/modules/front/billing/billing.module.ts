import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { TrackComponent } from './track/track.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BillingComponent } from './billing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TrackComponent,CheckoutComponent,BillingComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class BillingModule { }
