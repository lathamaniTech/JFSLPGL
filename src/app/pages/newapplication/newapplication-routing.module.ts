import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewapplicationPage } from './newapplication.page';

const routes: Routes = [
  {
    path: '',
    component: NewapplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewapplicationPageRoutingModule {}
