import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [HeaderComponent,LoginformComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule    
  ],
  exports:[HeaderComponent,LoginformComponent,RegistrationComponent]
})
export class CoreModule { }
