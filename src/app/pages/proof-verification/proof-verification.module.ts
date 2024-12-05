import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProofVerificationPageRoutingModule } from './proof-verification-routing.module';

import { ProofVerificationPage } from './proof-verification.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProofVerificationPageRoutingModule
  ],
  declarations: [ProofVerificationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProofVerificationPageModule { }
