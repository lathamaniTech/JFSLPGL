import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleCostDetailsPage } from './vehicle-cost-details.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleCostDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleCostDetailsPageRoutingModule {}
