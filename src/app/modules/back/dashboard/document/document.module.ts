import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    HttpClientModule
  ]
})
export class DocumentModule { }
