import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PddImgsPageRoutingModule } from './pdd-imgs-routing.module';

import { PddImgsPage } from './pdd-imgs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PddImgsPageRoutingModule
  ],
  declarations: [PddImgsPage]
})
export class PddImgsPageModule {}
