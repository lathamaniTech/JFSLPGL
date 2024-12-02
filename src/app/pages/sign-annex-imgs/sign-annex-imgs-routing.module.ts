import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignAnnexImgsPage } from './sign-annex-imgs.page';

const routes: Routes = [
  {
    path: '',
    component: SignAnnexImgsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignAnnexImgsPageRoutingModule {}
