import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';
import { SqliteService } from 'src/providers/sqlite.service';

@Component({
  selector: 'app-other-imgs',
  templateUrl: './other-imgs.page.html',
  styleUrls: ['./other-imgs.page.scss'],
})
export class OtherImgsPage {

  deregisterFunction: Function;
  applicant: any = [];
  showImage: boolean = false;
  refId: any;
  id: any;
  cibilStat: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    // public viewCtrl: ViewController, 
    public modalCtrl: ModalController, 
    public platform: Platform,
    public globalData: DataPassingProviderService, 
    public sqliteProvider: SqliteService) {
    this.getCibilCheckStatus();
    this.applicant = navParams.get('pic');
    if (navParams.get('pic')) {
      this.showImage = true;
    } else {
      this.showImage = false;
    }
  }


  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    // this.platform.registerBackButtonAction(() => {
    //   this.navCtrl.pop();
    // });
    this.deregisterFunction();
  }
  ionViewDidEnter() {
    // this.deregisterFunction = this.platform.registerBackButtonAction(() => {
    //   this.viewCtrl.dismiss();
    // });
  }

  updateimage() {
    this.modalCtrl.dismiss('updateProfileIMAGE');
  }

  getCibilCheckStatus() {
    this.refId = this.globalData.getrefId();
    this.id = this.globalData.getId();
    this.sqliteProvider.getSubmitDetails(this.refId, this.id).then(data => {
      this.cibilStat = data[0].cibilCheckStat;
    })
  }


}
