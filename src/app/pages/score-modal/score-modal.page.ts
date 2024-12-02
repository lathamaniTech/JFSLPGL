import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';

@Component({
  selector: 'app-score-modal',
  templateUrl: './score-modal.page.html',
  styleUrls: ['./score-modal.page.scss'],
})
export class ScoreModalPage implements OnInit {

  scoreCardParams: FormGroup;
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
  dummy_masterResidence = [
    { "code": "1", "name": "Owned" },
    { "code": "2", "name": "Rented" },
    { "code": "3", "name": "Leased" }
  ];
  dummySource = [
    { "code": "1", "name": "Direct Sales" },
    { "code": "2", "name": "3rd Party" }
  ]

  
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
    this.scoreCardParams = this.formBuilder.group({
      age: [""],
      advance: [""],
      downPayment: ["", Validators.required],
      assetCategory: [""],
      // qualification: [""],
      assetCost: [""],
      stateGroup: [""],
      monthlyIncome: [""],
      residenseType: [""],
      empType: [""],
      residingYears: [""],
      totalExp: [""],
      sourcing: ["", Validators.required],
      majorState: [""],
      downpayment: [""],
      assetCat: [""],
      monthIncome: [""],
      costVehicle: [""],
      custAge: [""],
      yearsResidence: [""],
      installment: [""],
      qualification: [""]
    });
    // this.scoreCardParams = this.formBuilder.group({
    //   age: [""],
    //   advance: [""],
    //   downPayment: ["", Validators.required],
    //   assetCategory: [""],
    //   qualification: [""],
    //   assetCost: [""],
    //   stateGroup: [""],
    //   monthlyIncome: [""],
    //   residenseType: [""],
    //   empType: [""],
    //   residingYears: [""],
    //   totalExp: [""],
    //   sourcing: ["", Validators.required]
    // });
  }
  ngOnInit() {
    // let root = this.viewCtrl.instance.navCtrl._app._appRoot;
    document.addEventListener('click', function (event) {
      let btn = <HTMLLIElement>document.querySelector('.remove-ok .alert-button-group');
      let target = <HTMLElement>event.target;
      // if (btn && target.className == 'alert-radio-label' || target.className == 'alert-radio-inner' || target.className == 'alert-radio-icon') {
      //   let view = root._overlayPortal._views[0];
      //   let inputs = view.instance.d.inputs;
      //   for (let input of inputs) {
      //     if (input.checked) {
      //       view.instance.d.buttons[1].handler([input.value]);
      //       view.dismiss();
      //       break;
      //     }
      //   }
      // }
    });
  }
  ionViewDidLoad() {
    const data = this.navParams.data;
    console.log(data, 'ionViewDidLoad ScoreModalPage');
    this.scoreCardParams.get("age").setValue(data.age);
    this.scoreCardParams.get("assetCategory").setValue(data.assetCategory);
    this.scoreCardParams.get("qualification").setValue(data.qualification);
    this.scoreCardParams.get("assetCost").setValue(data.assetCost);
    this.scoreCardParams.get("stateGroup").setValue(data.stateGroup);
    this.scoreCardParams.get("empType").setValue(data.empType);
    this.scoreCardParams.get("residingYears").setValue(data.residingYears);
    this.scoreCardParams.get("totalExp").setValue(data.totalExp);
  }
  submitValues: any;
  scoreCardSave(value) {
    console.log(value);
    this.submitValues = value;
    this.closeModal('s');
  }

  closeModal(type) {
    if (type == "s") {
      this.modalCtrl.dismiss(this.submitValues);
    } else if (type == "c") {
      this.modalCtrl.dismiss({});
    }
  }
  /*  
    AGE
    ADVANCE INSTALLMENT
    DOWN PAYMENT RATE
    ASSET CATEGORY
    QUALIFICATION
    ASSET COST
    STATE GROUP
    MONTHLY INCOME
    RESIDENCE TYPE
    EMPLOYEMENT TYPE
    NO OF YEARS RESIDING AT THE RESIDENCE
    TOTAL EXPERIENCE
    SOURCING CHANNEL
    */


}
