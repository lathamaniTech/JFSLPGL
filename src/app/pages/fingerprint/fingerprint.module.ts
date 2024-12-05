import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FingerprintPageRoutingModule } from './fingerprint-routing.module';

import { FingerprintPage } from './fingerprint.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FingerprintPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [FingerprintPage],
})
export class FingerprintPageModule {}
