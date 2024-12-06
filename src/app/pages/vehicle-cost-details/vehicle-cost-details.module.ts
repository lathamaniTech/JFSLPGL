import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleCostDetailsPageRoutingModule } from './vehicle-cost-details-routing.module';

import { VehicleCostDetailsPage } from './vehicle-cost-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleCostDetailsPageRoutingModule,
  ],
  declarations: [VehicleCostDetailsPage],
})
export class VehicleCostDetailsPageModule {}
