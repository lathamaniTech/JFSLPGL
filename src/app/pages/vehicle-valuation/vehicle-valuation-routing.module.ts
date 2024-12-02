import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleValuationPage } from './vehicle-valuation.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleValuationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleValuationPageRoutingModule {}
