import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetTabsPage } from './asset-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AssetTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetTabsPageRoutingModule {}
