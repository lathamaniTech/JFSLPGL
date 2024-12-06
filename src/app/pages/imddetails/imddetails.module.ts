import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImddetailsPageRoutingModule } from './imddetails-routing.module';

import { ImddetailsPage } from './imddetails.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DirectivesModule,
    ImddetailsPageRoutingModule,
    IonicSelectableModule,
  ],
  declarations: [ImddetailsPage],
})
export class ImddetailsPageModule {}
