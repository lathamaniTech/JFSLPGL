import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupInboxPageRoutingModule } from './group-inbox-routing.module';

import { GroupInboxPage } from './group-inbox.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { NgxPaginationModule } from 'ngx-pagination'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupInboxPageRoutingModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [GroupInboxPage]
})
export class GroupInboxPageModule {}