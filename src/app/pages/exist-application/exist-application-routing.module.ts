import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistApplicationPage } from './exist-application.page';

const routes: Routes = [
  {
    path: '',
    component: ExistApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistApplicationPageRoutingModule {}
