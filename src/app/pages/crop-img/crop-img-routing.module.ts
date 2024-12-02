import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropImgPage } from './crop-img.page';

const routes: Routes = [
  {
    path: '',
    component: CropImgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropImgPageRoutingModule {}
