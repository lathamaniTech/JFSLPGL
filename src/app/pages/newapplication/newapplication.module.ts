import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewapplicationPageRoutingModule } from './newapplication-routing.module';

import { NewapplicationPage } from './newapplication.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/modules/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewapplicationPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    DirectivesModule,
    PipesModule
  ],
  declarations: [NewapplicationPage]
})
export class NewapplicationPageModule {}
