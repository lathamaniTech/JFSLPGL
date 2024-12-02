import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseCustomerPage } from './choose-customer.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseCustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseCustomerPageRoutingModule {}
