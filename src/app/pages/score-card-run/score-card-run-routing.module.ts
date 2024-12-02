import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoreCardRunPage } from './score-card-run.page';

const routes: Routes = [
  {
    path: '',
    component: ScoreCardRunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreCardRunPageRoutingModule {}
