import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicproofPage } from './picproof.page';

const routes: Routes = [
  {
    path: '',
    component: PicproofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PicproofPageRoutingModule {}
