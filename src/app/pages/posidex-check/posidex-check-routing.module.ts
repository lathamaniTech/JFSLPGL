import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosidexCheckPage } from './posidex-check.page';

const routes: Routes = [
  {
    path: '',
    component: PosidexCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosidexCheckPageRoutingModule {}
