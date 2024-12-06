import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreCardRunPageRoutingModule } from './score-card-run-routing.module';

import { ScoreCardRunPage } from './score-card-run.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreCardRunPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [ScoreCardRunPage],
})
export class ScoreCardRunPageModule {}
