import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropImgPageRoutingModule } from './crop-img-routing.module';

import { CropImgPage } from './crop-img.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropImgPageRoutingModule
  ],
  declarations: [CropImgPage]
})
export class CropImgPageModule {}
