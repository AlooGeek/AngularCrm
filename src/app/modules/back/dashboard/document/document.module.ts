import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    HttpClientModule,
    FormsModule 
  ]
})
export class DocumentModule { }
