import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferenceDetailsPageRoutingModule } from './reference-details-routing.module';

import { ReferenceDetailsPage } from './reference-details.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferenceDetailsPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [ReferenceDetailsPage],
})
export class ReferenceDetailsPageModule {}
