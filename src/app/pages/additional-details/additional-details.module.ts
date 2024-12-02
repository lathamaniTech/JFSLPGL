import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalDetailsPageRoutingModule } from './additional-details-routing.module';

import { AdditionalDetailsPage } from './additional-details.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalDetailsPageRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  declarations: [AdditionalDetailsPage]
})
export class AdditionalDetailsPageModule {}
