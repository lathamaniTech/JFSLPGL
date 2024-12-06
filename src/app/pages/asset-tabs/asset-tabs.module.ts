import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetTabsPageRoutingModule } from './asset-tabs-routing.module';

import { AssetTabsPage } from './asset-tabs.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetTabsPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
    IonicSelectableModule,
  ],
  declarations: [AssetTabsPage],
})
export class AssetTabsPageModule {}
