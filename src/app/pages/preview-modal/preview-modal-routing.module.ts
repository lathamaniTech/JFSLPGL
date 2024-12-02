import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewModalPage } from './preview-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewModalPageRoutingModule {}
