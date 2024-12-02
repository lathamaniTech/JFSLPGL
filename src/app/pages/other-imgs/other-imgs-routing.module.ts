import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherImgsPage } from './other-imgs.page';

const routes: Routes = [
  {
    path: '',
    component: OtherImgsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherImgsPageRoutingModule {}
