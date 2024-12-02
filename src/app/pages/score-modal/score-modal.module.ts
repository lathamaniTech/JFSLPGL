import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreModalPageRoutingModule } from './score-modal-routing.module';

import { ScoreModalPage } from './score-modal.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreModalPageRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  declarations: [ScoreModalPage]
})
export class ScoreModalPageModule {}
