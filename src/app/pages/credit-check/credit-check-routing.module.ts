import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditCheckPage } from './credit-check.page';

const routes: Routes = [
  {
    path: '',
    component: CreditCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditCheckPageRoutingModule {}
