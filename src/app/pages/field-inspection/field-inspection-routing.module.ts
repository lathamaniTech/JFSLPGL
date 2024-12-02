import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FieldInspectionPage } from './field-inspection.page';

const routes: Routes = [
  {
    path: '',
    component: FieldInspectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldInspectionPageRoutingModule {}
