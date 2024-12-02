import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss'],
})
export class RemarksComponent {

  text: string;
  remarks: any;
  urn: any;

  constructor(public modalCtrl: ModalController,
    public navParams: NavParams) {
    console.log('Hello RemarksComponent Component');
    this.text = 'Hello World';
    this.urn = this.navParams.get('data');

  }

  onClose(){
    this.modalCtrl.dismiss(this.remarks);
    console.log("remarks", `${this.remarks}`);    
  }

}