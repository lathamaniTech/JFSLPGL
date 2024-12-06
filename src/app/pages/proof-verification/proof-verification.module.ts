import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProofVerificationPageRoutingModule } from './proof-verification-routing.module';

import { ProofVerificationPage } from './proof-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProofVerificationPageRoutingModule
  ],
  declarations: [ProofVerificationPage]
})
export class ProofVerificationPageModule {}
