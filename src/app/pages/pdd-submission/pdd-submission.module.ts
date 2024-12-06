import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PddSubmissionPageRoutingModule } from './pdd-submission-routing.module';

import { PddSubmissionPage } from './pdd-submission.page';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PddSubmissionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PddSubmissionPage],
  providers: [WebView],
})
export class PddSubmissionPageModule {}
