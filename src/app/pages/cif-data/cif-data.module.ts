import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CifDataPageRoutingModule } from './cif-data-routing.module';

import { CifDataPage } from './cif-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CifDataPageRoutingModule
  ],
  declarations: [CifDataPage]
})
export class CifDataPageModule {}
