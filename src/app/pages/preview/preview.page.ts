import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/providers/global.service';
import { PreviewModalPage } from '../preview-modal/preview-modal.page';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage  {

  @ViewChild('mySlider') slider: IonSlides;

  public basicEdit: boolean = false;
  public personalEdit: boolean = false;
  public idProofEdit: boolean = false;
  public addressEdit: boolean = false;
  public imgproof: boolean = false;
  public address: any;
  
  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public globFunc: GlobalService,
    public router: Router) {
    this.address = "residential";
  }

  ionViewWillEnter() {
    this.globFunc.statusbarValuesForPages();
  }

  ionViewDidEnter() {
    this.globFunc.statusbarValuesForPages();
  }

  basicEnable() {
    this.basicEdit = true;
  }

  personalEnable() {
    this.personalEdit = true;
  }

  idProofEnable() {
    this.idProofEdit = true;
  }

  addressEnable() {
    this.addressEdit = true;
  }

  addressDisable() {
    this.addressEdit = false;
  }
  adharPage() {
    this.router.navigate(['/NewapplicationPage'], {queryParams: { userType: 'A', leadSlide: 'lead'},skipLocationChange: true, replaceUrl: true});
  }

  async PreviewModal() {
    this.imgproof = true;
    let proofModal = await this.modalCtrl.create({
      component: PreviewModalPage,
    });
    proofModal.present();
  }

}
