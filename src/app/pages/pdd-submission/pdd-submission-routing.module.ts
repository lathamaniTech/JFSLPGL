import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PddSubmissionPage } from './pdd-submission.page';

const routes: Routes = [
  {
    path: '',
    component: PddSubmissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PddSubmissionPageRoutingModule {}
