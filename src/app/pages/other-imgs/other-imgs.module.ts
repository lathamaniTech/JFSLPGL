import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherImgsPageRoutingModule } from './other-imgs-routing.module';

import { OtherImgsPage } from './other-imgs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherImgsPageRoutingModule
  ],
  declarations: [OtherImgsPage]
})
export class OtherImgsPageModule {}
