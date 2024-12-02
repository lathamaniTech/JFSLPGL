import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherDocsPage } from './other-docs.page';

const routes: Routes = [
  {
    path: '',
    component: OtherDocsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherDocsPageRoutingModule {}
