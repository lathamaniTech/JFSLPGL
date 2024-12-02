import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpConcernPageRoutingModule } from './otp-concern-routing.module';

import { OtpConcernPage } from './otp-concern.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpConcernPageRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  declarations: [OtpConcernPage]
})
export class OtpConcernPageModule {}
