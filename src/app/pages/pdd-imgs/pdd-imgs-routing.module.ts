import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PddImgsPage } from './pdd-imgs.page';

const routes: Routes = [
  {
    path: '',
    component: PddImgsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PddImgsPageRoutingModule {}
