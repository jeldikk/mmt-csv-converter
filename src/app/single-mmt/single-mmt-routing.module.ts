import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SingleMmtComponent } from "./single-mmt.component";

const routes: Routes = [
  {
    path: "home",
    component: SingleMmtComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleMmtRoutingModule {}
