import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardCoreComponent } from "./dashboard-core/dashboard-core.component";
import { ProducttComponent } from "./productt/productt.component";
import { DiscountComponent } from "./discount/discount.component";
import { OfferComponent } from "./offer/offer.component";
import { PackComponent } from "./pack/pack.component";
import { CategoryComponent } from "./category/category.component";
import { StoreComponent } from "./store/store.component";
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", component: DashboardCoreComponent },
      { path: "product", component: ProducttComponent },
      { path: "discount", component: DiscountComponent },
      { path: "offer", component: OfferComponent },
      { path: "pack", component: PackComponent },
      { path: "category", component: CategoryComponent },
      { path: "store", component: StoreComponent },
      { path: "users", component: UsersComponent },
      { path: "roles", component: RolesComponent },
      { path: "doc", loadChildren: "./document/document.module#DocumentModule" },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
