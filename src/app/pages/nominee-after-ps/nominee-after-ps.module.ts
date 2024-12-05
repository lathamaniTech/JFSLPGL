import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NomineeAfterPsPageRoutingModule } from './nominee-after-ps-routing.module';

import { NomineeAfterPsPage } from './nominee-after-ps.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NomineeAfterPsPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [NomineeAfterPsPage],
})
export class NomineeAfterPsPageModule {}
