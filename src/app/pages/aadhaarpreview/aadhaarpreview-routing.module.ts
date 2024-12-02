import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AadhaarpreviewPage } from './aadhaarpreview.page';

const routes: Routes = [
  {
    path: '',
    component: AadhaarpreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AadhaarpreviewPageRoutingModule {}
