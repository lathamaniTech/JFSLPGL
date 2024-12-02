import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestPurposePage } from './test-purpose.page';

const routes: Routes = [
  {
    path: '',
    component: TestPurposePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPurposePageRoutingModule {}
