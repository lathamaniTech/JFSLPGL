import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.page.html',
  styleUrls: ['./preview-modal.page.scss'],
})
export class PreviewModalPage {

  docImg: boolean;
  addProofDocs:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl: ModalController
    // public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewModalPage');
  }

  closeProofModal() {
    this.modalCtrl.dismiss();
  }

  proofImgRemove(value) {
    console.log(value, 'proofImgRemove');    
  }

  takeProofImg() {
    console.log('takeProofImg');
  }
}
