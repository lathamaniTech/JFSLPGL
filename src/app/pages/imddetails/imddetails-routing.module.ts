import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImddetailsPage } from './imddetails.page';

const routes: Routes = [
  {
    path: '',
    component: ImddetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImddetailsPageRoutingModule {}
