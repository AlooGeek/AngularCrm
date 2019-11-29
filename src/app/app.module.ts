import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './core/services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [{  
    provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
