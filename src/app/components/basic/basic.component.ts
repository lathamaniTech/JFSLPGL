import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavParams,
  Platform,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PicproofPage } from 'src/app/pages/picproof/picproof.page';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';
import { GlobalService } from 'src/providers/global.service';
import { RestService } from 'src/providers/rest.service';
import { SqliteService } from 'src/providers/sqlite.service';
import { SquliteSupportProviderService } from 'src/providers/squlite-support-provider.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  refId: string;
  id: string;
  appStatusURL: string;
  createdUser: string;
  deviceId: string;
  userType: string;
  productType: string;
  sixteenDigId: string;
  leadId: string;
  pagename: string = 'Basic Details';
  coAppFlag: string;
  guaFlag: string;

  signImglen: number = 0;
  appUniqueId: number;
  idNumber: number;
  schemeCode: number;
  loanAmount: number;
  loanAmountFrom: number;
  loanAmountTo: number;
  interestFrom: number;
  interestTo: number;
  tenureFrom: number;
  tenureTo: number;

  productClicked: boolean = false;
  submitDisable: boolean = false;
  lmsData: boolean = false;

  basicData: FormGroup;

  idType: any;
  janaLoanName: any;
  moratorium: any;
  janaid: any;
  signPic: any;
  naveParamsValue: any;
  profPic: any;
  _selectedCenter: any;
  org_master: any;
  dateValue: any;
  refinfo: any;
  pdt_master: any[];
  signImgs: any = [];
  userPrdResponse: any[];
  getBasicData: any[];
  jana_products: any = [];
  scheme_master: any[] = [];
  processFeesData: any = [];
  intType: any = [
    { code: "1", name: "Fixed" },
    { code: "2", name: "Floating" },
    { code: "3", name: "Hybrid" },
  ];

  loanProduct = [{ prdCode: '960', prdDesc: '960' }];

  createdDate = new Date();
  formActivater = { disableForm: true };
  @Output() saveStatus = new EventEmitter();


  selectOptions = {
    cssClass: 'remove-ok',
  };
  customPopoverOptions = {
    cssClass: 'custom-popover',
  };


  // dummy_master: any = [
  //   { CODE: '2', NAME: 'Value_2' },
  //   { CODE: '1', NAME: 'Value_1' },
  // ];



  constructor(
    public navCtrl: Router,
    public platform: Platform,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public sqliteProvider: SqliteService,
    public alertCtrl: AlertController,
    public globalData: DataPassingProviderService,
    public device: Device,
    public loadCtrl: LoadingController,
    public network: Network,
    private globFunc: GlobalService,
    public master: RestService,
    private activateRoute: ActivatedRoute,
    public sqlSupport: SquliteSupportProviderService
  ) {
    this.activateRoute.queryParamMap.subscribe((data: any) => {
      this.naveParamsValue = data.params;
      this.childConstructor(this.naveParamsValue);
    });
  }

  private childConstructor(value) {
    this.getProductScheme();
    this.getAllJanaProducts();
    this.getCibilCheckedDetails();
    this.dateValue = new Date();
    this.appStatusURL = this.master.apiURL + 'AppStatus';

    this.createdUser = this.globFunc.basicDec(localStorage.getItem('username'));
    this.deviceId = this.device.uuid;
    this.createdDate = new Date();
    this.userType = this.globalData.getborrowerType();
    console.log(this.userType, 'usertype in basic');
    this.productType = localStorage.getItem('loan');
    this.profPic = this.globalData.getProfileImage();

    this.janaid = this.naveParamsValue.janaid;

    if (this.naveParamsValue.aadhar) {
      this.idType = this.naveParamsValue.aadhar;
      this.idNumber = this.naveParamsValue.idNumber;
    } else if (this.naveParamsValue.passport) {
      this.idType = this.naveParamsValue.passport;
    } else if (this.naveParamsValue.licence) {
      this.idType = this.naveParamsValue.licence;
    } else if (this.naveParamsValue.voter) {
      this.idType = this.naveParamsValue.voter;
    } else {
      this.idType = {
        idNumber: 'test',
        type: 'others',
      };
    }
    this.leadId = this.naveParamsValue.leadId;

    this.refId = this.globalData.getrefId();
    this.id = this.globalData.getId();

    if (this.userType === 'A') {
      this.id = this.globalData.getId();
    } else if (this.userType === 'G') {
      this.globalData.setId('');
      this.saveStatus.emit('basicTick');
      localStorage.setItem('Basic', 'basicSaved');
    }

    if (this.naveParamsValue.appRefValue) {
      this.refinfo = JSON.parse(this.naveParamsValue.appRefValue);
      this.refId = this.refinfo.refId;
      this.globalData.setrefId(this.refId);
      this.id = this.refinfo.id;
      this.globalData.setId(this.id);
      this.productType = this.refinfo.productType;
      this.globalData.setloanType(this.productType);
    }

    this.basicData = this.formBuilder.group({
      prdSche: ['', Validators.required],
      janaLoan: ['', Validators.required],
      loanAmount: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
      interest: ['', Validators.required],
      intRate: ['', Validators.required],
      tenure: ['', Validators.compose([Validators.pattern('^(?!0+$)[0-9]*$'), Validators.required])],
    });

    if (this.refId === '' || this.refId === undefined || this.refId === null) {
      this.refId = '';
    } else {
      this.getBasicDetails();
    }

    if (this.naveParamsValue.fieldDisable) {
      this.submitDisable = true;
    }

  }

  ngOnInit() { }

  ngAfterViewInit() { }

  getOrgName(value: string) {
    let selectedOrgName = this.org_master.find((f) => {
      return f.orgscode === value;
    });
    return selectedOrgName;
  }

  async basicsave(value) {
    console.log(value, 'basicsave');
    this.globalData.globalLodingPresent('Please wait...');
    this.profPic = this.globalData.getProfileImage();
    this.loanAmount = parseInt(this.basicData.get('loanAmount').value);
    if (value.janaLoan.length == 1) {
      value.janaLoan = value.janaLoan[0];
      this.janaLoanName = this.getJanaLoanName(value.janaLoan);
    } else {
      this.janaLoanName = this.getJanaLoanName(value.janaLoan);
    }
    if (this.loanAmount < this.loanAmountFrom) {
      this.globalData.globalLodingDismiss();
      this.globalData.showAlert(
        'Alert!',
        'You must enter the minimum loan amount of ' + this.loanAmountFrom
      );
    } else if (this.loanAmount > this.loanAmountTo) {
      this.globalData.globalLodingDismiss();
      this.globalData.showAlert(
        'Alert!',
        'You are Eligible maximum loan amount of ' + this.loanAmountTo
      );
    } else {
      if (this.naveParamsValue.ekycData) {
        value.janaRefId = this.janaid;
        value.vaultStatus = 'Y';
      }
      let isEkyc = await this.sqliteProvider.getEKYCDetails(this.leadId);
      if (isEkyc.length > 0) {
        value.janaRefId = isEkyc[0].janaid;
        value.vaultStatus = 'Y';
      }
      if (this.profPic) {
        if (this.signImgs.length > 0) {
          this.signPic = this.signImgs[0].imgpath;
          if (this.refId === '' || this.refId === undefined || this.refId === null) {
            this.appUniqueId = Math.floor(Math.random() * 90000000) + 10000000;
            this.globalData.setUniqueId(this.appUniqueId);
            let rootData = [this.createdDate, this.deviceId, this.createdUser, 'mlos' + this.appUniqueId];
            this.sqliteProvider.rootDetails(rootData).then((data) => {
              let aaaId = 'mlos' + new Date().getFullYear() + '0000';
              let idStr = '' + data.insertId;
              this.sixteenDigId = aaaId.substring(0, aaaId.length - idStr.length) + data.insertId;
              this.refId = data.insertId;
              this.globalData.setrefId(this.refId);
              if (this.idType == 'aadhaar') {
                this.sqliteProvider.insertIdproofData(this.idNumber, this.idType, this.leadId);
              } else {
                this.sqliteProvider.insertIdproofData(this.idType.idNumber, this.idType.type, this.leadId);
              }
              this.sqliteProvider
                .addAndUpdateBasicDetails(this.refId, value, this.loanAmountFrom, this.loanAmountTo, this.guaFlag,
                  this.userType, this.profPic, this.signPic, this.id)
                .then((data) => {
                  this.id = data.insertId;
                  this.globalData.setborrowerType(this.userType);
                  this.globalData.setId(this.id);
                  this.globalData.globalLodingDismiss();
                  this.globalData.showAlert(
                    'Alert!',
                    'Loan Facilities Added Successfully'
                  );
                  this.formActivater.disableForm = true;
                  this.globFunc.setapplicationDataChangeDetector(
                    'saved',
                    this.pagename
                  );
                  this.saveStatus.emit('basicTick');
                  localStorage.setItem('Basic', 'basicSaved');
                  this.globalData.setPDT('');
                })
                .catch((Error) => {
                  this.globalData.globalLodingDismiss();
                  this.globalData.showAlert('Alert!', 'Failed!');
                });
            });
          } else {
            this.sqliteProvider
              .addAndUpdateBasicDetails(this.refId, value, this.loanAmountFrom, this.loanAmountTo, this.guaFlag,
                this.userType, this.profPic, this.signPic, this.id
              ).then((data) => {
                this.saveStatus.emit('basicTick');
                localStorage.setItem('Basic', 'basicSaved');
                this.globalData.globalLodingDismiss();
                this.globalData.showAlert(
                  'Alert!',
                  'Loan Facilities Updated Successfully'
                );
                this.globFunc.setapplicationDataChangeDetector(
                  'saved',
                  this.pagename
                );
                this.formActivater.disableForm = true;
                this.globalData.setPDT('');
              })
              .catch((Error) => {
                this.globalData.globalLodingDismiss();
                this.globalData.showAlert('Alert!', 'Failed!');
              });
          }
        } else {
          this.globalData.globalLodingDismiss();
          this.globalData.showAlert(
            'Alert!',
            'Must Capture the Signatre Image!'
          );
        }
      } else {
        this.globalData.globalLodingDismiss();
        this.globalData.showAlert(
          'Alert!',
          'Must Capture the Applicant Profile Image!'
        );
      }
    }
  }

  getBasicDetails() {
    this.globalData.globalLodingPresent('Fetching Data...!');
    this.sqliteProvider.getBasicDetails_GL(this.refId, this.id).then((data) => {
      this.getBasicData = data;
      this.basicData.controls.prdSche.setValue(this.getBasicData[0].prdSche);
      this.basicData.controls.janaLoan.setValue(
        this.getBasicData[0].janaLoan
      );
      this.basicData.controls.loanAmount.setValue(
        this.getBasicData[0].loanAmount
      );
      this.getProductValue(this.getBasicData[0].prdSche);
      this.basicData.controls.tenure.setValue(this.getBasicData[0].tenure);
      this.basicData.controls.interest.setValue(this.getBasicData[0].interest);
      this.basicData.controls.intRate.setValue(this.getBasicData[0].intRate);
      this.refId = this.getBasicData[0].refId;
      this.id = this.getBasicData[0].id;
      this.userType = this.getBasicData[0].userType;
      this.profPic = this.globalData.setProfileImage(
        this.getBasicData[0].profPic
      );
      this.signImgs = [];
      let signObj = { imgpath: this.getBasicData[0].signPic };
      this.signImgs.push(signObj);
      this.signImglen = this.signImgs.length;
      this.saveStatus.emit('basicTick');
      localStorage.setItem('Basic', 'basicSaved');
    })
      .catch((Error) => {
        console.log(Error);
      });
  }

  getOrganisationValue() {
    this.sqliteProvider.getOrganisation().then((data) => {
      this.org_master = data;
      if (
        this.refId === '' || this.refId === undefined || this.refId === null
      ) {
        this.basicData
          .get('janaCenter')
          .setValue(this.getOrgName(localStorage.getItem('janaCenter')));
      }
    });
  }

  async getProductValue(value) {
    await this.sqliteProvider.getOrganisationState(localStorage.getItem('janaCenter')).then(orgCode => {
      if (orgCode.length > 0) {
        if (value) {
          if (this.userPrdResponse && this.userPrdResponse.length > 0) {
            let sepcSubCode = this.userPrdResponse.filter(data => data.main == value);
            if (sepcSubCode && sepcSubCode.length > 0) {
              this.pdt_master = [];
              sepcSubCode.forEach(async subCode => {
                await this.sqlSupport.getProductBasedOnSchemeSpec(orgCode[0].OrgID, value, subCode.sub)
                  .then(data => {
                    this.pdt_master.push(...data);
                    this.productChange(undefined);
                  })
              })
            } else {
              this.sqlSupport.getProductBasedOnScheme(orgCode[0].OrgID, value).then(data => {
                console.log("data product", data);
                this.pdt_master = [];
                this.pdt_master = data;
                this.productChange(undefined);
              })
            }
          } else {
            this.sqlSupport.getProductBasedOnScheme(orgCode[0].OrgID, value).then(data => {
              console.log("data product", data);
              this.pdt_master = [];
              this.pdt_master = data;
              this.productChange(undefined);
            })
          }
        } else {
          this.sqliteProvider.getAllProductValues().then(data => {
            this.pdt_master = [];
            this.pdt_master = data;
            this.productChange(undefined);
          })
        }
      } else {
        this.globalData.showAlert("Alert!", `Product not configured for this branch user!`);
      }

    })
  }


  schemeChng(value, type) {
    if (type == 'chng') {
      this.basicData.controls.janaLoan.setValue('');
      this.basicData.controls.janaLoan.updateValueAndValidity();
      this.basicData.controls.interest.setValue('');
      this.basicData.controls.interest.updateValueAndValidity();
      this.basicData.controls.intRate.setValue('');
      this.basicData.controls.intRate.updateValueAndValidity();
      this.basicData.controls.tenure.setValue('');
      this.basicData.controls.tenure.updateValueAndValidity();
      this.basicData.controls.loanAmount.setValue('');
      this.basicData.controls.loanAmount.updateValueAndValidity();
    }
    this.getProductValue(value.detail.value);
  }

  productChange(change) {
    if (change == 'prdChange') {
      this.productClicked = true;
    }
    if (this.pdt_master) {
      this.pdt_master.forEach((element) => {
        if (element.prdCode == this.basicData.controls.janaLoan.value) {
          this.loanAmountFrom = element.prdamtFromRange;
          this.loanAmountFrom = +this.loanAmountFrom;
          this.loanAmountTo = element.prdamtToRange;
          this.loanAmountTo = +this.loanAmountTo;
          this.interestFrom = element.prdbaserate;
          this.interestTo = element.prdinterest;
          this.tenureFrom = element.prdTenorFrom;
          this.tenureFrom = +this.tenureFrom;
          this.tenureTo = element.prdTenorTo;
          this.tenureTo = +this.tenureTo;
          this.schemeCode = element.prdSchemeCode;
          this.moratorium = element.prdMoratoriumMax;
          this.coAppFlag = 'N'; //element.prdCoappFlag;
          this.guaFlag = 'N'; //element.prdGuaFlag;
          localStorage.setItem(
            'product',
            this.basicData.controls.janaLoan.value
          );
          this.globalData.eventValue.next(
            this.basicData.controls.janaLoan.value
          );
        }
      });
    } else {
      console.log('sub category empty');
    }
  }

  today(): string {
    let today: string = this.globalData.getToday();
    return today;
  }

  convertdate(str: string) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('-');
  }

  getJanaCenterName(value: string) {
    let selectedOrgName = this.org_master.find((f) => {
      return f.orgscode === value;
    });
    this._selectedCenter = selectedOrgName;
    return selectedOrgName.orgname;
  }

  getJanaLoanName(value: string) {
    let selectedLoanName = this.pdt_master.find((f) => {
      return f.prdCode === value;
    });
    return selectedLoanName.prdDesc;
  }

  getCibilCheckedDetails() {
    this.refId = this.globalData.getrefId();
    this.id = this.globalData.getId();
    this.sqliteProvider.getSubmitDetails(this.refId, this.id).then((data) => {
      if (data.length > 0) {
        if (data[0].cibilCheckStat == '1') {
          this.submitDisable = true;
        } else {
          this.submitDisable = false;
        }
      }
    });
  }

  getProductCodeValue(value: string) {
    let selectedLoanName = this.pdt_master.find((f) => {
      return f.prdname === value;
    });
    return selectedLoanName.prdcode;
  }

  getJanaSchemeCode(value: string) {
    let selectedLoanName = this.jana_products.find((f) => {
      return f.prdSchemeId === value;
    });
    return selectedLoanName.prdSchemeCode;
  }

  async getProductScheme() {
    await this.sqliteProvider.getMasterDataUsingType('ProductScheme').then(async data => {
      if (JSON.parse(localStorage.getItem('userPrdSubCode')).length > 0) {
        await this.master.getProdCodeByLoginGroup(JSON.parse(localStorage.getItem('userPrdSubCode'))).then(async (userPrd: any[]) => {
          this.userPrdResponse = userPrd;
          if (this.userPrdResponse.length > 0) {
            let scheme_master = data;
            for (var i = 0; i < scheme_master.length; i++) {
              if (this.userPrdResponse.some(data => data.main === scheme_master[i].CODE)) {
                this.scheme_master.push(scheme_master[i]);
              }
              if (i == scheme_master.length - 1 && this.getBasicData[0].prdSche) {
                await this.getProductValue(this.getBasicData[0].prdSche);
              }
            }
          } else {
            this.scheme_master = data;
          }
        })
      } else {
        this.scheme_master = data;
      }
    })
  }



  getAllJanaProducts() {
    this.sqliteProvider.getAllProductValues().then((data) => {
      this.jana_products = data;
    });
  }

  getIntRate(val) {
    let prd = this.basicData.controls.janaLoan.value;
    let intType = val.detail ? val.detail.value : val[0];
    if (prd != '' && prd != null && prd != undefined && intType != ''
      && intType != null && intType != undefined
    ) {
      this.sqliteProvider.getInterestRate(prd, intType).then((data) => {
        if (data.length > 0) {
          this.basicData.controls.intRate.setValue(data[0].Mclr);
        } else {
          this.basicData.controls.intRate.setValue('');
          this.basicData.controls.interest.setValue('');
          this.basicData.controls.interest.updateValueAndValidity();
          this.globalData.presentToastMiddle(
            'Interest type is not available for the selected product!!!'
          );
        }
      });
    }
  }

  productCheck() {
    if (
      this.basicData.controls.prdSche.value == '' ||
      this.basicData.controls.prdSche.value == undefined ||
      this.basicData.controls.prdSche.value == null
    ) {
      this.globalData.showAlert('Alert!', `Please select Loan Main Product!`);
    }
  }

  /**
   * @method signatureImg
   * @description Function use to capture Signature image of the customer.
   * @author HariHaraSuddhan S
   */

  async signatureImg(value) {
    if (value == 'sign') {
      const modal = await this.modalCtrl.create({
        component: PicproofPage,
        componentProps: {
          signpics: this.signImgs,
          submitstatus: this.submitDisable,
        },
      });
      await modal.present();
      await modal.onDidDismiss().then((response: any) => {
        this.signImgs = [];
        this.signImgs = response.data;
        this.signImglen = response.data.length;
      });
    }
  }

  checkTenureProduct() {
    try {
      if ((parseInt(this.basicData.get('tenure').value) < this.tenureFrom) || (parseInt(this.basicData.get('tenure').value) > this.tenureTo)) {
        this.basicData.get('tenure').setValue("");
        this.basicData.get('tenure').updateValueAndValidity();
        this.globalData.showAlert("Alert!", `Please Enter Tenure period between ${this.tenureFrom} - ${this.tenureTo}`);
      }
    } catch (error) {
      this.sqlSupport.insertErrorLog(error.stack, "BasicComponent-checkTenureProduct");
    }
  }

}
