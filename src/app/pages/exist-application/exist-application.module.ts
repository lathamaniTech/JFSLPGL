import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistApplicationPageRoutingModule } from './exist-application-routing.module';

import { ExistApplicationPage } from './exist-application.page';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExistApplicationPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    DirectivesModule
  ],
  declarations: [ExistApplicationPage]
})
export class ExistApplicationPageModule {}
