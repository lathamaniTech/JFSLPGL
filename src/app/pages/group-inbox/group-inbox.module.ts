import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupInboxPageRoutingModule } from './group-inbox-routing.module';

import { GroupInboxPage } from './group-inbox.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupInboxPageRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [GroupInboxPage],
})
export class GroupInboxPageModule {}
