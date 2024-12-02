import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitModalPageRoutingModule } from './submit-modal-routing.module';

import { SubmitModalPage } from './submit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitModalPageRoutingModule
  ],
  declarations: [SubmitModalPage]
})
export class SubmitModalPageModule {}
