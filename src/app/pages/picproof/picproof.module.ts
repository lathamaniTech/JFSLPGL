import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PicproofPageRoutingModule } from './picproof-routing.module';

import { PicproofPage } from './picproof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PicproofPageRoutingModule
  ],
  declarations: [PicproofPage]
})
export class PicproofPageModule {}
