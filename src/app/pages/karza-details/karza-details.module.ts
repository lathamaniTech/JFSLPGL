import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KarzaDetailsPageRoutingModule } from './karza-details-routing.module';

import { KarzaDetailsPage } from './karza-details.page';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KarzaDetailsPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DirectivesModule,
  ],
  declarations: [KarzaDetailsPage],
})
export class KarzaDetailsPageModule {}
