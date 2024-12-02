import { Component, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IonSlides, NavController, NavParams } from '@ionic/angular';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';
import { GlobalService } from 'src/providers/global.service';

@Component({
  selector: 'app-aadhaarpreview',
  templateUrl: './aadhaarpreview.page.html',
  styleUrls: ['./aadhaarpreview.page.scss'],
})
export class AadhaarpreviewPage {

  @ViewChild('mySlider') slider: IonSlides;
  userType: any;

  constructor(public navCtrl: Router, public navParams: NavParams,
    public globalData: DataPassingProviderService, public globFunc: GlobalService) {
    this.userType = this.globalData.getborrowerType();
  }

  ionViewWillEnter() {
    // this.globFunc.statusbarValues();  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AadhaarpreviewPage');
  }

  presentLoadingCustomNo() {
    this.navCtrl.navigate(['/NewapplicationPage'], { queryParams: { paramNo: 'personal', userType: this.userType }, skipLocationChange: true, replaceUrl: true });
  }
  presentLoadingCustomYes() {
    this.navCtrl.navigate(['/NewapplicationPage'], { queryParams: { paramYes: 'idproof', userType: this.userType }, skipLocationChange: true, replaceUrl: true });
  }

}
