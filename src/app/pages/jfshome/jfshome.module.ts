import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JfshomePageRoutingModule } from './jfshome-routing.module';

import { JfshomePage } from './jfshome.page';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JfshomePageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DirectivesModule,
  ],
  declarations: [JfshomePage],
})
export class JfshomePageModule {}
