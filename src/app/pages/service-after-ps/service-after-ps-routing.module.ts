import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceAfterPsPage } from './service-after-ps.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceAfterPsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceAfterPsPageRoutingModule {}
