import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PddSubmissionPageRoutingModule } from './pdd-submission-routing.module';

import { PddSubmissionPage } from './pdd-submission.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PddSubmissionPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [PddSubmissionPage],
  providers:[WebView]
})
export class PddSubmissionPageModule {}
