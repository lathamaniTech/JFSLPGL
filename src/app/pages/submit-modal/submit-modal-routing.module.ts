import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitModalPage } from './submit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitModalPageRoutingModule {}
