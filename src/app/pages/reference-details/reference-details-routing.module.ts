import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferenceDetailsPage } from './reference-details.page';

const routes: Routes = [
  {
    path: '',
    component: ReferenceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenceDetailsPageRoutingModule {}
