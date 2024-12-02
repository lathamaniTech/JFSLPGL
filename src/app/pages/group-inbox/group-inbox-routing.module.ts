import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupInboxPage } from './group-inbox.page';

const routes: Routes = [
  {
    path: '',
    component: GroupInboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupInboxPageRoutingModule {}
