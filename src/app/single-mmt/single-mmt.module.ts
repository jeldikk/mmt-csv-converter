import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SingleMmtComponent } from "./single-mmt.component";
import { SingleMmtRoutingModule } from "./single-mmt-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { OutputComponent } from "./output/output.component";
import { InfoComponent } from "./output/info/info.component";
import { ErrorComponent } from "./output/error/error.component";
import { SuccessComponent } from "./output/success/success.component";

@NgModule({
  declarations: [
    SingleMmtComponent,
    OutputComponent,
    InfoComponent,
    ErrorComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SingleMmtRoutingModule,
    ReactiveFormsModule,
  ],
})
export class SingleMmtModule {}
