import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SecondKycComponent } from './components/second-kyc/second-kyc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'JsfhomePage',
    loadChildren: () => import('./pages/jfshome/jfshome.module').then(m => m.JfshomePageModule)
  },
  {
    path: 'AdditionalDetailsPage',
    loadChildren: () => import('./pages/additional-details/additional-details.module').then(m => m.AdditionalDetailsPageModule)
  },
  {
    path: 'audit-logs',
    loadChildren: () => import('./pages/audit-logs/audit-logs.module').then(m => m.AuditLogsPageModule)
  },
  {
    path: 'ChoosecustomerPage',
    loadChildren: () => import('./pages/choose-customer/choose-customer.module').then(m => m.ChooseCustomerPageModule)
  },
  {
    path: 'CibilcheckPage',
    loadChildren: () => import('./pages/cibil-check/cibil-check.module').then(m => m.CibilCheckPageModule)
  },
  {
    path: 'CifDataPage',
    loadChildren: () => import('./pages/cif-data/cif-data.module').then(m => m.CifDataPageModule)
  },
  {
    path: 'CreditCheckPage',
    loadChildren: () => import('./pages/credit-check/credit-check.module').then(m => m.CreditCheckPageModule)
  },
  {
    path: 'CropImgPage',
    loadChildren: () => import('./pages/crop-img/crop-img.module').then(m => m.CropImgPageModule)
  },
  {
    path: 'DocumentUploadPage',
    loadChildren: () => import('./pages/document-upload/document-upload.module').then(m => m.DocumentUploadPageModule)
  },
  {
    path: 'DocumentViewPage',
    loadChildren: () => import('./pages/document-view/document-view.module').then(m => m.DocumentViewPageModule)
  },
  {
    path: 'ExistApplicationsPage',
    loadChildren: () => import('./pages/exist-application/exist-application.module').then(m => m.ExistApplicationPageModule)
  },
  {
    path: 'ExistingPage',
    loadChildren: () => import('./pages/existing/existing.module').then(m => m.ExistingPageModule)
  },
  {
    path: 'FieldInspectionPage',
    loadChildren: () => import('./pages/field-inspection/field-inspection.module').then(m => m.FieldInspectionPageModule)
  },
  {
    path: 'GroupInboxPage',
    loadChildren: () => import('./pages/group-inbox/group-inbox.module').then(m => m.GroupInboxPageModule)
  },
  {
    path: 'FingerprintPage',
    loadChildren: () => import('./pages/fingerprint/fingerprint.module').then(m => m.FingerprintPageModule)
  },
  {
    path: 'ImddetailsPage',
    loadChildren: () => import('./pages/imddetails/imddetails.module').then(m => m.ImddetailsPageModule)
  },
  {
    path: 'karza-details',
    loadChildren: () => import('./pages/karza-details/karza-details.module').then(m => m.KarzaDetailsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'NachPage',
    loadChildren: () => import('./pages/nach/nach.module').then(m => m.NachPageModule)
  },
  {
    path: 'NewapplicationPage',
    loadChildren: () => import('./pages/newapplication/newapplication.module').then(m => m.NewapplicationPageModule)
  },
  {
    path: 'nominee-after-ps',
    loadChildren: () => import('./pages/nominee-after-ps/nominee-after-ps.module').then(m => m.NomineeAfterPsPageModule)
  },
  {
    path: 'OtherDocsPage',
    loadChildren: () => import('./pages/other-docs/other-docs.module').then(m => m.OtherDocsPageModule)
  },
  {
    path: 'other-imgs',
    loadChildren: () => import('./pages/other-imgs/other-imgs.module').then(m => m.OtherImgsPageModule)
  },
  {
    path: 'OtpConcernPage',
    loadChildren: () => import('./pages/otp-concern/otp-concern.module').then(m => m.OtpConcernPageModule)
  },
  {
    path: 'pdd-imgs',
    loadChildren: () => import('./pages/pdd-imgs/pdd-imgs.module').then(m => m.PddImgsPageModule)
  },
  {
    path: 'PddSubmissionPage',
    loadChildren: () => import('./pages/pdd-submission/pdd-submission.module').then(m => m.PddSubmissionPageModule)
  },
  {
    path: 'PosidexCheckPage',
    loadChildren: () => import('./pages/posidex-check/posidex-check.module').then(m => m.PosidexCheckPageModule)
  },
  {
    path: 'PostSanctionPage',
    loadChildren: () => import('./pages/post-sanction/post-sanction.module').then(m => m.PostSanctionPageModule)
  },
  {
    path: 'preview',
    loadChildren: () => import('./pages/preview/preview.module').then(m => m.PreviewPageModule)
  },
  {
    path: 'picproof',
    loadChildren: () => import('./pages/picproof/picproof.module').then(m => m.PicproofPageModule)
  },
  {
    path: 'preview-modal',
    loadChildren: () => import('./pages/preview-modal/preview-modal.module').then(m => m.PreviewModalPageModule)
  },
  {
    path: 'proof-modal',
    loadChildren: () => import('./pages/proof-modal/proof-modal.module').then(m => m.ProofModalPageModule)
  },
  {
    path: 'ReferenceDetailsPage',
    loadChildren: () => import('./pages/reference-details/reference-details.module').then(m => m.ReferenceDetailsPageModule)
  },
  {
    path: 'ScoreCardPage',
    loadChildren: () => import('./pages/score-card/score-card.module').then(m => m.ScoreCardPageModule)
  },
  {
    path: 'score-card-run',
    loadChildren: () => import('./pages/score-card-run/score-card-run.module').then(m => m.ScoreCardRunPageModule)
  },
  {
    path: 'score-modal',
    loadChildren: () => import('./pages/score-modal/score-modal.module').then(m => m.ScoreModalPageModule)
  },
  {
    path: 'service-after-ps',
    loadChildren: () => import('./pages/service-after-ps/service-after-ps.module').then(m => m.ServiceAfterPsPageModule)
  },
  {
    path: 'show-image',
    loadChildren: () => import('./pages/show-image/show-image.module').then(m => m.ShowImagePageModule)
  },
  {
    path: 'sign-annex-imgs',
    loadChildren: () => import('./pages/sign-annex-imgs/sign-annex-imgs.module').then(m => m.SignAnnexImgsPageModule)
  },
  {
    path: 'submit',
    loadChildren: () => import('./pages/submit/submit.module').then(m => m.SubmitPageModule)
  },
  {
    path: 'submit-modal',
    loadChildren: () => import('./pages/submit-modal/submit-modal.module').then(m => m.SubmitModalPageModule)
  },
  {
    path: 'TabsPage',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ViewDetailsPage',
    loadChildren: () => import('./pages/view-details/view-details.module').then(m => m.ViewDetailsPageModule)
  },
  {
    path: 'secondKycPage', component: SecondKycComponent
  },
  {
    path: 'ProofVerification',
    loadChildren: () => import('./pages/proof-verification/proof-verification.module').then(m => m.ProofVerificationPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
