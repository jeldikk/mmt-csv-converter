import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { SingleMmtRoutingModule } from "./single-mmt/single-mmt-routing.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "single-mmt",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    SingleMmtRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
