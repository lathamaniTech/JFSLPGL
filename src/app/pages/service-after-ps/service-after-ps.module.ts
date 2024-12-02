import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceAfterPsPageRoutingModule } from './service-after-ps-routing.module';

import { ServiceAfterPsPage } from './service-after-ps.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceAfterPsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  declarations: [ServiceAfterPsPage]
})
export class ServiceAfterPsPageModule {}
