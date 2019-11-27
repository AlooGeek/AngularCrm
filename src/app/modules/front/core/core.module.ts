import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent,LoginformComponent],
  imports: [
    CommonModule,
    FormsModule
    
  ],
  exports:[HeaderComponent,LoginformComponent]
})
export class CoreModule { }
