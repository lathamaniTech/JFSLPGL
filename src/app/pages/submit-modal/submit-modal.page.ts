import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.page.html',
  styleUrls: ['./submit-modal.page.scss'],
})
export class SubmitModalPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  animationOption = {
    loop: false,
    prerender: false,
    autoplay: true,
    autoloadSegments: true,
    path: 'assets/success.json'
  }
  handleAnimation(e) {
    console.log(e, 'lottie');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitModalPage');
  }
  close() {
    this.modalCtrl.dismiss({});
  }

}
