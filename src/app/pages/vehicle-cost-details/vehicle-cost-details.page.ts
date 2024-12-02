import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-cost-details',
  templateUrl: './vehicle-cost-details.page.html',
  styleUrls: ['./vehicle-cost-details.page.scss'],
})
export class VehicleCostDetailsPage  {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleCostDetailsPage');
  }
}
