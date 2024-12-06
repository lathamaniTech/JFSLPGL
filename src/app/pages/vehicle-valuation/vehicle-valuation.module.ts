import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleValuationPageRoutingModule } from './vehicle-valuation-routing.module';

import { VehicleValuationPage } from './vehicle-valuation.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleValuationPageRoutingModule,
    DirectivesModule,
    ReactiveFormsModule,
  ],
  declarations: [VehicleValuationPage],
})
export class VehicleValuationPageModule {}
