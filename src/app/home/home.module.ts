import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OutputComponent } from './output/output.component';
import { InfoComponent } from './output/info/info.component';
import { ErrorComponent } from './output/error/error.component';
import { SuccessComponent } from './output/success/success.component';

@NgModule({
  declarations: [HomeComponent, OutputComponent, InfoComponent, ErrorComponent, SuccessComponent],
  imports: [
    CommonModule, 
    SharedModule, 
    HomeRoutingModule, 
    ReactiveFormsModule
  ]
})
export class HomeModule {}
