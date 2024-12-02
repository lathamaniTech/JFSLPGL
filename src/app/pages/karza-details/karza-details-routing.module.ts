import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KarzaDetailsPage } from './karza-details.page';

const routes: Routes = [
  {
    path: '',
    component: KarzaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KarzaDetailsPageRoutingModule {}
