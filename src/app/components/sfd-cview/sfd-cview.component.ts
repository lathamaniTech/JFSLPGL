import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MenuController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-sfd-cview',
  templateUrl: './sfd-cview.component.html',
  styleUrls: ['./sfd-cview.component.scss'],
})
export class SfdCviewComponent {

  text: string;
  sfdcData: any;

  constructor(public navParams: NavParams,public activateRoute : ActivatedRoute, 
    public viewCtrl: MenuController) {
    this.sfdcData = this.navParams.get('data');
    console.log('Hello SfdCviewComponent Component');
    this.text = 'Hello World';
  }

  closeModal() {
    this.viewCtrl.close();
  }

}
