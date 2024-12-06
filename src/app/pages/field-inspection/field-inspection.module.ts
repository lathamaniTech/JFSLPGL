import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FieldInspectionPageRoutingModule } from './field-inspection-routing.module';

import { FieldInspectionPage } from './field-inspection.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FieldInspectionPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [FieldInspectionPage],
})
export class FieldInspectionPageModule {}
