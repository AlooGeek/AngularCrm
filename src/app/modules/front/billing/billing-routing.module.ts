import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { TrackComponent } from './track/track.component';
import { ManagementComponent } from './management/management.component';
import { BillPdfComponent } from './bill-pdf/bill-pdf.component';


const routes: Routes = [
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'track/:id', component: TrackComponent
  },
  {
    path: 'management', component: ManagementComponent
  },
  {
    path: 'pdf/:id', component:BillPdfComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
