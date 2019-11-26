import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { TrackComponent } from './track/track.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BillingComponent } from './billing.component';

@NgModule({
  declarations: [TrackComponent,CheckoutComponent,BillingComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
  ],
})
export class BillingModule { }
