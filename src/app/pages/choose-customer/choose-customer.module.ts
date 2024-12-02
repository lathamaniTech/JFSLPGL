import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseCustomerPageRoutingModule } from './choose-customer-routing.module';

import { ChooseCustomerPage } from './choose-customer.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DirectivesModule,
    ChooseCustomerPageRoutingModule
  ],
  declarations: [ChooseCustomerPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ChooseCustomerPageModule {}
