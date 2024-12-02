import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JfshomePage } from './jfshome.page';

const routes: Routes = [
  {
    path: '',
    component: JfshomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JfshomePageRoutingModule {}
