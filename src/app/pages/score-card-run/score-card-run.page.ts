import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';

@Component({
  selector: 'app-score-card-run',
  templateUrl: './score-card-run.page.html',
  styleUrls: ['./score-card-run.page.scss'],
})
export class ScoreCardRunPage {

  scoreCardRun: FormGroup;
  refId: any;
  id: any;
  userType: any;
  submitDisable: boolean = false;
  selectOptions = {
    cssClass: 'remove-ok'
  };
  yesOrNo: any = [
    { code: "1", name: "YES" },
    { code: "2", name: "NO" },
  ];
  dummy_master = [
    { "code": "1", "name": "6" },
    { "code": "2", "name": "12" },
    { "code": "3", "name": "18" },
    { "code": "4", "name": "24" },
    { "code": "5", "name": "30" },
    { "code": "6", "name": "36" },
    { "code": "7", "name": "48" },
    { "code": "8", "name": "60" },
  ];

  customPopoverOptions = {
    cssClass: 'custom-popover'
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    // public viewCtrl: ViewController, 
    public formBuilder: FormBuilder, 
    public globalData: DataPassingProviderService,
    public modalCtrl: ModalController) {
    this.refId = this.globalData.getrefId();
    this.id = this.globalData.getId();
    this.userType = this.globalData.getborrowerType();
    this.scoreCardRun = this.formBuilder.group({
      eligibleAmount: [""],
      appliedAmount: ["", Validators.required],
      tenure: ["", Validators.required],
      roi: [""],
      marginMoney: ["", Validators.required],
      processFee: [""],
      stampDuty: [""],
      nachCharge: [""],
      pddCharge: [""],
      otherCharge: [""],
      insPremium: [""],
      preEmi: ["0"],
      advanceEmi: [""],
      emi: [""],
      emiMode: [""],
      totalDownPay: [""],
      dbAmount: [""]
    });
  }

  ionViewDidLoad() {
    console.log(this.navParams.data, 'ionViewDidLoad ScoreCardRunPage');

  }
  /*
Elegible Loan Amount 
Applied Loan Amount
Tenure
ROI
Margin Money
Processing Fee
Stamp duty
NACH Charges
PDD Charges
Other Charges - Doc Charges 
Insurance Premium 
Pre-EMI 
Advance EMI Amount
EMI 
EMI Mode
Total Down Payment
DB Amount 
  */
  scoreCardRunSave(value) { console.log(value); }

  closeModal() {
    this.modalCtrl.dismiss({});
  }

}
