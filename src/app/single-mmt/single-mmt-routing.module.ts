import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SingleMmtComponent } from "./single-mmt.component";
import { LogsComponent } from "./logs/logs.component";

const routes: Routes = [
  {
    path: "single-mmt",
    component: SingleMmtComponent,
  },
  {
    path: "logs",
    component: LogsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleMmtRoutingModule {}
