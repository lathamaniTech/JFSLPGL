import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostSanctionPageRoutingModule } from './post-sanction-routing.module';

import { PostSanctionPage } from './post-sanction.page';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/modules/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostSanctionPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    DirectivesModule,
    IonicSelectableModule,
    PipesModule
  ],
  declarations: [PostSanctionPage]
})
export class PostSanctionPageModule {}
