import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NomineeAfterPsPage } from './nominee-after-ps.page';

const routes: Routes = [
  {
    path: '',
    component: NomineeAfterPsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NomineeAfterPsPageRoutingModule {}
