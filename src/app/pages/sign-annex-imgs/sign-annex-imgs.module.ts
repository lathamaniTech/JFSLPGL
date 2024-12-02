import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignAnnexImgsPageRoutingModule } from './sign-annex-imgs-routing.module';

import { SignAnnexImgsPage } from './sign-annex-imgs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignAnnexImgsPageRoutingModule
  ],
  declarations: [SignAnnexImgsPage]
})
export class SignAnnexImgsPageModule {}
