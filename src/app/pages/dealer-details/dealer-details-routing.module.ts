import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerDetailsPage } from './dealer-details.page';

const routes: Routes = [
  {
    path: '',
    component: DealerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerDetailsPageRoutingModule {}
