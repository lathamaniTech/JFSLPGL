import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherDocsPageRoutingModule } from './other-docs-routing.module';

import { OtherDocsPage } from './other-docs.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';
import { PipesModule } from 'src/modules/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherDocsPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
  ],
  declarations: [OtherDocsPage],
})
export class OtherDocsPageModule {}
