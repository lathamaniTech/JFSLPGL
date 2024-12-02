import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NachPage } from './nach.page';

const routes: Routes = [
  {
    path: '',
    component: NachPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NachPageRoutingModule {}
