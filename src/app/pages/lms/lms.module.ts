import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LmsPageRoutingModule } from './lms-routing.module';

import { LmsPage } from './lms.page';
import { PipesModule } from 'src/modules/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LmsPageRoutingModule,
    PipesModule,
  ],
  declarations: [LmsPage],
})
export class LmsPageModule {}
