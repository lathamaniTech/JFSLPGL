import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NachPageRoutingModule } from './nach-routing.module';

import { NachPage } from './nach.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';
import { PipesModule } from 'src/modules/pipes/pipes.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NachPageRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule,
    PipesModule,
    IonicSelectableModule
  ],
  declarations: [NachPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NachPageModule {}
