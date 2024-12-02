import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealerDetailsPageRoutingModule } from './dealer-details-routing.module';

import { DealerDetailsPage } from './dealer-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealerDetailsPageRoutingModule
  ],
  declarations: [DealerDetailsPage]
})
export class DealerDetailsPageModule {}
