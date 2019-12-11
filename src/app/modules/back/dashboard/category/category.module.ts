import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from '../category/category.component';
import { NgbdSortableHeader } from './sortable.directive';


@NgModule({
 
  imports: [
    CommonModule,
    CategoryRoutingModule
  ],
  declarations: [NgbdSortableHeader,CategoryComponent],
 
})
export class CategoryModule { }
