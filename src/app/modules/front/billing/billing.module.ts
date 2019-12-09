import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { TrackComponent } from './track/track.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BillingComponent } from './billing.component';
import { ManagementComponent } from './management/management.component';
import { FormsModule } from '@angular/forms';
import { BillPdfComponent } from './bill-pdf/bill-pdf.component';
import { SortPipe } from './management/sort.pipe';
import { UiService } from './management/ui.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [TrackComponent,CheckoutComponent,BillingComponent, ManagementComponent, BillPdfComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [ SortPipe,UiService],
})
export class BillingModule { }
