import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProofVerificationPage } from './proof-verification.page';

const routes: Routes = [
  {
    path: '',
    component: ProofVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProofVerificationPageRoutingModule {}
