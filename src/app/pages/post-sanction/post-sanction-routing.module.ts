import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostSanctionPage } from './post-sanction.page';

const routes: Routes = [
  {
    path: '',
    component: PostSanctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostSanctionPageRoutingModule {}
