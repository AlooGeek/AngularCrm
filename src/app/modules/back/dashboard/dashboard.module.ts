import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { ProducttComponent } from "./productt/productt.component";
import { DashboardCoreComponent } from "./dashboard-core/dashboard-core.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DiscountComponent } from "./discount/discount.component";
import { OfferComponent } from "./offer/offer.component";
import { PackComponent } from "./pack/pack.component";
import { StoreComponent } from "./store/store.component";
import { CategoryComponent } from "./category/category.component";
import { AgmCoreModule } from "@agm/core";
import { UsersComponent } from "./users/users.component";
import { RolesComponent } from "./roles/roles.component";
import { ClaimsComponent } from "./claims/claims.component";
import { DocumentModule } from './document/document.module';

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    ClaimsComponent,
    DashboardComponent,
    ProducttComponent,
    DashboardCoreComponent,
    DiscountComponent,
    OfferComponent,
    PackComponent,
    StoreComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DocumentModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCb7JUS-ZKpLY7FYFuKW4eAMoStiGsaroY",
      libraries: ["places"]
    })
  ]
})
export class DashboardModule {}
