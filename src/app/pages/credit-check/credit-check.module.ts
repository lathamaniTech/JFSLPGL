import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditCheckPageRoutingModule } from './credit-check-routing.module';

import { CreditCheckPage } from './credit-check.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditCheckPageRoutingModule,
    DirectivesModule,
    ReactiveFormsModule,
  ],
  declarations: [CreditCheckPage],
})
export class CreditCheckPageModule {}
