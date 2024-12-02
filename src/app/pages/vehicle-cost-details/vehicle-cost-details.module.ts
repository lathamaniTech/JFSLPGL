import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleCostDetailsPageRoutingModule } from './vehicle-cost-details-routing.module';

import { VehicleCostDetailsPage } from './vehicle-cost-details.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleCostDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [VehicleCostDetailsPage]
})
export class VehicleCostDetailsPageModule {}
