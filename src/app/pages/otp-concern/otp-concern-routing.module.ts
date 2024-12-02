import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpConcernPage } from './otp-concern.page';

const routes: Routes = [
  {
    path: '',
    component: OtpConcernPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpConcernPageRoutingModule {}
