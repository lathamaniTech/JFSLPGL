import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AadhaarpreviewPageRoutingModule } from './aadhaarpreview-routing.module';

import { AadhaarpreviewPage } from './aadhaarpreview.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AadhaarpreviewPageRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  declarations: [AadhaarpreviewPage]
})
export class AadhaarpreviewPageModule {}
