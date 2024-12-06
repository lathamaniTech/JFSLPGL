import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleDetailsPageRoutingModule } from './vehicle-details-routing.module';

import { VehicleDetailsPage } from './vehicle-details.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleDetailsPageRoutingModule,
    DirectivesModule,
    ReactiveFormsModule,
  ],
  declarations: [VehicleDetailsPage],
})
export class VehicleDetailsPageModule {}
