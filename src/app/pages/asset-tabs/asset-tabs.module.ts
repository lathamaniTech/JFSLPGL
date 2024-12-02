import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetTabsPageRoutingModule } from './asset-tabs-routing.module';

import { AssetTabsPage } from './asset-tabs.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';
// import { StatusComponent } from 'src/app/components/status/status.component';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { IonicSelectableModule } from 'ionic-selectable';
// import { IonicSelectableComponent } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetTabsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DirectivesModule,
    IonicSelectableModule
    // IonicSelectableComponent
  ],
  declarations: [AssetTabsPage]
})
export class AssetTabsPageModule {}
