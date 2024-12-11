import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule, NavParams } from '@ionic/angular';
import { CaptureImageComponent } from 'src/app/components/capture-image/capture-image.component';
import { ExpandableComponent } from 'src/app/components/expandable/expandable.component';
import { BasicComponent } from 'src/app/components/basic/basic.component';
import { PersonalComponent } from 'src/app/components/personal/personal.component';
import { AddressComponent } from 'src/app/components/address/address.component';
import { ProofComponent } from 'src/app/components/proof/proof.component';
import { LeadComponent } from 'src/app/components/lead/lead.component';
import { AadharComponent } from 'src/app/components/aadhar/aadhar.component';
import { SourcingComponent } from 'src/app/components/sourcing/sourcing.component';
import { EntityComponent } from 'src/app/components/entity/entity.component';
import { NachComponent } from 'src/app/components/nach/nach.component';
import { ProgressbarComponent } from 'src/app/components/progressbar/progressbar.component';
import { SecondKycComponent } from 'src/app/components/second-kyc/second-kyc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicSelectableModule } from 'ionic-selectable';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { DirectivesModule } from '../directives/directives.module';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { VerifyOtpComponent } from 'src/app/components/verify-otp/verify-otp.component';
import { ViewReferenceDetailsComponent } from 'src/app/components/view-reference-details/view-reference-details.component';
import { RemarksComponent } from 'src/app/components/remarks/remarks.component';
import { CasadetailsComponent } from 'src/app/components/casadetails/casadetails.component';
import { NomineedetailsComponent } from 'src/app/components/nomineedetails/nomineedetails.component';
import { ServicedetailsComponent } from 'src/app/components/servicedetails/servicedetails.component';
import { CropImageComponent } from 'src/app/components/crop-image/crop-image.component';
import { EmailValidatorComponent } from 'src/app/formcontrols/email-validator/email-validator.component';

@NgModule({
  declarations: [
    CaptureImageComponent,
    ExpandableComponent,
    BasicComponent,
    PersonalComponent,
    AddressComponent,
    ProofComponent,
    LeadComponent,
    AadharComponent,
    SourcingComponent,
    EntityComponent,
    NachComponent,
    ProgressbarComponent,
    SecondKycComponent,
    PaginationComponent,
    VerifyOtpComponent,
    ViewReferenceDetailsComponent,
    RemarksComponent,
    NomineedetailsComponent,
    CasadetailsComponent,
    ServicedetailsComponent,
    CropImageComponent,
    EmailValidatorComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DirectivesModule,
  ],
  exports: [
    CaptureImageComponent,
    ExpandableComponent,
    BasicComponent,
    PersonalComponent,
    AddressComponent,
    ProofComponent,
    LeadComponent,
    AadharComponent,
    SourcingComponent,
    EntityComponent,
    NachComponent,
    ProgressbarComponent,
    SecondKycComponent,
    PaginationComponent,
    VerifyOtpComponent,
    ViewReferenceDetailsComponent,
    RemarksComponent,
    NomineedetailsComponent,
    CasadetailsComponent,
    ServicedetailsComponent,
    CropImageComponent,
    EmailValidatorComponent,
  ],
  entryComponents: [SecondKycComponent],
  providers: [HTTP, NavParams],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
