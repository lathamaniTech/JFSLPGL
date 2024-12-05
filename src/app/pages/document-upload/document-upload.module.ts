import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentUploadPageRoutingModule } from './document-upload-routing.module';

import { DocumentUploadPage } from './document-upload.page';
import { DirectivesModule } from 'src/modules/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentUploadPageRoutingModule,
    DirectivesModule,
  ],
  declarations: [DocumentUploadPage],
})
export class DocumentUploadPageModule {}
