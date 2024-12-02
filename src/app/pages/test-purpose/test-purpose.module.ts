import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPurposePageRoutingModule } from './test-purpose-routing.module';

import { TestPurposePage } from './test-purpose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPurposePageRoutingModule
  ],
  declarations: [TestPurposePage]
})
export class TestPurposePageModule {}
