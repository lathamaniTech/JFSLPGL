import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CifDataPage } from './cif-data.page';

const routes: Routes = [
  {
    path: '',
    component: CifDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CifDataPageRoutingModule {}
