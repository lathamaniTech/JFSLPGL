import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LmsPage } from './lms.page';

const routes: Routes = [
  {
    path: '',
    component: LmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmsPageRoutingModule {}
