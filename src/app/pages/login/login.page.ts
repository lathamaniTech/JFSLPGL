import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {
  NavController,
  Platform,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { GlobalService } from 'src/providers/global.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { RestService } from 'src/providers/rest.service';
import { SqliteService } from 'src/providers/sqlite.service';
import { SquliteSupportProviderService } from 'src/providers/squlite-support-provider.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { JfshomePage } from '../jfshome/jfshome.page';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';
import { environment } from 'src/environments/environment';
import { OnRoadPriceService } from 'src/providers/on-road-price.service';
import { BioNavigatorService } from 'src/providers/BioMetricPlugin/bio-navigator.service';

// import 'rxjs/add/operator/map';

declare var ImageCompression: any;
declare var MantraRDService: any;
declare var cordova: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  todayDate: any = new Date();
  @ViewChild('loginDiv') logindiv: ElementRef;
  updateDate: string;
  lastLoginDate: string;
  public userData: any;
  deviceImei: string;
  version: any;
  orgscode: any;
  logResult: any;
  urlType: any;
  userGroupsName: any;
  versionDetails: string;
  patch: string;
  todayLoginDate: any = new Date();
  masterData: {
    Setupmastval: { setupfinal: any; setupversion: any; setupmodule: string };
  };
  masterDataValues: any;
  masterDataValuesTest: any;
  versionvalue: any;

  droomModel: [];
  customPopoverOptions = {
    cssClass: 'custom-popover',
  };
  OhpDocsArray = [];
  @ViewChild('fileref') fileRef: ElementRef;
  capacitorVersion: number = 1;
  constructor(
    public navCtrl: NavController,
    public network: Network,
    public globalData: DataPassingProviderService,
    public loadCtrl: LoadingController,
    public platform: Platform,
    public master: RestService,
    public sqliteProvider: SqliteService,
    public globFunc: GlobalService,
    public sqlSupport: SquliteSupportProviderService,
    public device: Device,
    public router: Router,
    public renderer: Renderer2,
    public bioService: BioNavigatorService,
    private appVersion: AppVersion,
    public menuCtrl: MenuController,
    public orpService: OnRoadPriceService
  ) {
    this.userData = [{ username: '', password: '' }];
    // this.version = this.master.version;
    // this.userData.username = "FSE01";
    // this.userData.password = "laps1234";
    // this.userData.username = "ILFSE02"; //UAT
    // this.userData.password = "Jana@1234"; //UAT
    // this.userData.username = "ILFSE001"; //UAT new
    // this.userData.password = "Laps@1234"; //UAT new
    // this.userData.username = "VLCRES"; //PreProd new
    // this.userData.password = "Laps@1234"; //PreProd new
    // this.userData.username = "ILFSEIL";
    // this.userData.password = "laps";
    // this.userData.username = "nirantha.hs.cog";
    // this.userData.password = "Bank@2023";
    this.patch = this.master.patch;
  }

  ionViewDidLeave() {
    this.menuCtrl.swipeGesture(true);
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      var self = this;
      if (parseFloat(self.device.version) >= 9.0) {
        self.deviceImei = self.device.uuid;
        localStorage.setItem('imei', self.deviceImei);
        console.log('UUID: ' + self.deviceImei);
      } else {
        cordova.plugins.IMEI(function (err, imei) {
          self.deviceImei = imei;
          localStorage.setItem('imei', self.deviceImei);
          console.log('imei: ' + self.deviceImei);
        });
      }
      // cordova.plugins.IMEI(function (err, imei) {
      //   self.deviceImei = imei;
      // });
      this.urlType = environment.local;
      // this.platform.registerBackButtonAction(() => {
      //   this.platform.exitApp();
      // }, 0)
      this.appVersion.getVersionNumber().then((version) => {
        this.versionDetails = version;
      });
    });
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.menuCtrl.swipeGesture(false);
      setTimeout(() => {
        this.checkappData();
      }, 3000);
    });
  }

  checkappData() {
    let todayDate = moment().format('YYYY-MM-DD');
    this.sqliteProvider
      .appdatacheck()
      .then((data) => {
        // console.log(data);
        if (data.length > 0) {
          let appcreatedDate = data[0].appDate;
          //let appcreatedDate ="2018-01-01"
          let check = moment(appcreatedDate).diff(todayDate, 'days');
          if (check >= 31) {
            let toDate = moment().subtract(31, 'days').format('YYYY-MM-DD');
            this.sqliteProvider
              .deleteAuditTrailbydate(appcreatedDate, toDate)
              .then((data) => {
                console.log(data);
              })
              .catch((Error) => {
                console.log('Failed!');
              });
          }
        } else {
          this.sqliteProvider
            .appdatainsert(todayDate)
            .then((data) => {
              // console.log(data);
            })
            .catch((Error) => {
              console.log('Failed!');
              //this.showAlert("Alert!", "Failed!");
            });
        }
      })
      .catch((Error) => {
        console.log('Failed!');
        //this.showAlert("Alert!", "Failed!");
      });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  AppversionCheck() {
    let dd = this.todayDate.getDate();
    let mm = this.todayDate.getMonth() + 1; //January is 0!
    let yyyy = this.todayDate.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    this.updateDate = yyyy + '-' + mm + '-' + dd;
    this.sqliteProvider.getApplicationVersionCheck().then(
      (data) => {
        if (data.length > 0) {
          if (this.updateDate != data[0].AppDate) {
            this.mdmVersionCheck();
          } else {
            this.login();
          }
        } else {
          this.mdmVersionCheck();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  mdmVersionCheck() {
    console.log(this.versionDetails);
    if (this.network.type == 'none' || this.network.type == 'unknown') {
      this.globFunc.showAlert(
        'Alert',
        'Enable Internet connection / First Time Login Must be Online.'
      );
    } else {
      let body = {
        VersionId: this.versionDetails,
        Module: 'VL',
      };
      this.globFunc.globalLodingPresent('loading...');
      this.master
        .restApiCallAngular('VersionCheck', body)
        .then((data) => {
          let resp = <any>data;
          if (resp.ErrorCode === '000') {
            this.sqliteProvider
              .insertApplicationVersionCheck(this.updateDate)
              .then((data) => {
                this.globFunc.globalLodingDismiss();
                this.login();
              })
              .catch((Error) => {
                console.log('Failed!', Error);
              });
          } else {
            if (
              resp.ErrorDesc == 'App Version Mismatch' &&
              resp.ErrorCode === '001'
            ) {
              this.globFunc.globalLodingDismiss();
              let dd = this.todayDate.getDate();
              let mm = this.todayDate.getMonth() + 1; //January is 0!
              let yyyy = this.todayDate.getFullYear();
              if (dd < 10) {
                dd = '0' + dd;
              }
              if (mm < 10) {
                mm = '0' + mm;
              }
              this.todayLoginDate = yyyy + '-' + mm + '-' + dd;
              this.sqliteProvider
                .getApplicationVersionCheck()
                .then((data) => {
                  if (data.length > 0) {
                    if (this.todayLoginDate == data[0].AppDate) {
                      this.globFunc
                        .confirmationVersionAlert(
                          'Version Update',
                          'Your Current Version is ' +
                            resp.CurrentVersion +
                            ' Please Update!'
                        )
                        .then((data) => {
                          if (data) {
                            this.login();
                          }
                        })
                        .catch((Error) => {
                          console.log(Error);
                        });
                      // this.globFunc.showAlert("Alert!", "Your Current Version is " + resp.CurrentVersion + " Please Update!");
                    } else {
                      this.globFunc.showAlert(
                        'Alert',
                        'login disabled as you are using older version of the APK. To Proceed please update the APK to the latest Version and Login again'
                      );
                      setTimeout(() => {
                        // this.platform.exitApp();
                      }, 2000);
                    }
                  } else {
                    this.sqliteProvider
                      .insertApplicationVersionCheck(this.todayLoginDate)
                      .then((data) => {
                        this.globFunc
                          .confirmationVersionAlert(
                            'Version Update',
                            'Your Current Version is ' +
                              resp.CurrentVersion +
                              ' Please Update!'
                          )
                          .then((data) => {
                            if (data) {
                              this.login();
                            }
                          })
                          .catch((Error) => {
                            console.log(Error);
                          });
                        //this.globFunc.showAlert("Alert!", "Your Current Version is " + resp.CurrentVersion + " Please Update!");
                      })
                      .catch((Error) => {
                        console.log('Failed!', Error);
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              this.globFunc.globalLodingDismiss();
              this.globFunc.showAlert('Alert', resp.ErrorDesc);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.globFunc.globalLodingDismiss();
          this.globFunc.showAlert('Alert!', 'No Response From Server!');
        });
    }
  }

  // login() {
  //   this.bioService.acplL1_Device();
  // }

  onClickLoginBtn() {
    this.renderer.addClass(this.logindiv.nativeElement, 'open');
  }

  close() {
    this.renderer.removeClass(this.logindiv.nativeElement, 'open');
  }

  login() {
    this.sqliteProvider.getLastLogin('LoginService Response').then(
      (data) => {
        let resp = data;
        let len = data.length;
        if (len == 0) {
          this.lastLoginDate = '';
        } else {
          this.lastLoginDate = resp[len - 1].Timestamp;
        }
        let body = {
          Login: {
            Loginuser: this.userData.username,
            Loginpasswd: this.userData.password,
            IMEI: this.deviceImei,
            LLdate: this.lastLoginDate,
            Version: this.versionDetails,
            Brach_code: '',
            Module: 'VL',
          },
        };
        if (
          this.userData.username == undefined ||
          this.userData.username == null ||
          this.userData.username == ''
        ) {
          this.globFunc.showAlert('Alert!', 'Please enter Username!');
        } else if (
          this.userData.password == undefined ||
          this.userData.password == null ||
          this.userData.password == ''
        ) {
          this.globFunc.showAlert('Alert!', 'Please enter password!');
        } else {
          if (this.network.type == 'none' || this.network.type == 'unknown') {
            this.globFunc.globalLodingPresent(
              'Please wait... Fetching master data!'
            );
            this.sqliteProvider
              .getDocuments()
              .then((docdata) => {
                if (docdata.length > 0) {
                  this.sqliteProvider
                    .getUserIDLoginDetails(this.userData.username)
                    .then()
                    .then((user) => {
                      if (user.length > 0) {
                        localStorage.setItem('username', user[0].userID);
                        localStorage.setItem('userGroups', user[0].userGroups);
                        this.sqliteProvider
                          .forOfflineLogin(
                            this.userData.username,
                            this.userData.password
                          )
                          .then((data) => {
                            if (data.length > 0) {
                              this.orgscode = data[0].orgscode;
                              localStorage.setItem('roname', data[0].ro_name);
                              // localStorage.setItem('roname', "Abcde fghij");
                              this.globalData.setJanaCenter(this.orgscode);
                              localStorage.setItem('janaCenter', this.orgscode);
                              this.globFunc.globalLodingDismiss();
                              this.userData.username = '';
                              this.userData.password = '';
                              this.getUserGroupsNames(this.userData.username);
                              console.log(this.userGroupsName);
                              this.globalData.loginUserName(true);
                              this.router.navigate(['/JsfhomePage'], {
                                queryParams: {
                                  username: this.userData.username,
                                },
                                skipLocationChange: true,
                                replaceUrl: true,
                              });
                            } else {
                              this.globFunc.globalLodingDismiss();
                              // this.globFunc.showAlert("Alert!", "User Blocked / Username or Password Invalid!");
                              this.globFunc.showAlert(
                                'Alert!',
                                'Username or Password Invalid!!'
                              );
                            }
                          })
                          .catch((Error) => {
                            console.log('Failed!');
                          });
                      }
                    });
                } else {
                  if (
                    this.network.type == 'none' ||
                    this.network.type == 'unknown'
                  ) {
                    this.globFunc.globalLodingDismiss();
                    this.globFunc.showAlert(
                      'Alert',
                      'Enable Internet connection / First Time Login Must be Online.'
                    );
                  } else {
                    this.getProductList();
                    // this.getBasicMastersListNew();
                  }
                }
              })
              .catch((Error) => {
                console.log('Failed!');
              });
          } else {
            this.globFunc.globalLodingPresent(
              'Please wait... Fetching master data!'
            );
            this.master
              .restApiCallAngular('LoginService', body)
              .then(
                (data) => {
                  if ((<any>data).StatusCode === '000') {
                    this.logResult = <any>data;
                    this.orgscode = (<any>data).Orgscode;
                    localStorage.setItem(
                      'roname',
                      this.globFunc.basicEnc((<any>data).UserName)
                    );
                    localStorage.setItem(
                      'userPrdSubCode',
                      (<any>data).UserPrdId
                        ? JSON.stringify((<any>data).UserPrdId)
                        : JSON.stringify([])
                    );
                    if (this.urlType) {
                      this.globalData.setJanaCenter('2351');
                      localStorage.setItem('janaCenter', '2351');
                    } else {
                      this.globalData.setJanaCenter(this.orgscode);
                      localStorage.setItem('janaCenter', this.orgscode);
                    }
                    localStorage.setItem(
                      'username',
                      this.globFunc.basicEnc((<any>data).LPuserID)
                    );
                    localStorage.setItem('userGroups', (<any>data).UserGroups);
                    localStorage.setItem(
                      'ORPPer',
                      (<any>data).orpValue ? (<any>data).orpValue : 0
                    );
                    (<any>data).droomAuth
                      ? localStorage.setItem(
                          'access_token',
                          (<any>data).droomAuth
                        )
                      : this.orpService.getAccessTokenCall();
                    localStorage.setItem('loan', 'VL');
                    this.sqliteProvider
                      .insertLoginDetails(
                        this.userData.username,
                        this.userData.password,
                        (<any>data).Orgscode,
                        (<any>data).Status,
                        (<any>data).StatusCode,
                        (<any>data).UserName,
                        (<any>data).LPuserID,
                        (<any>data).UserGroups
                      )
                      .then((data) => {
                        this.getversion();
                      })
                      .catch((Error) => {
                        console.log('Failed!');
                      });
                  } else if ((<any>data).StatusCode === '001') {
                    let status = (<any>data).Status.toUpperCase();
                    if (status == 'USERBLOCKED') {
                      this.globFunc.globalLodingDismiss();
                      alert('User Blocked, please contact administrator!');
                    } else if (status == 'ACCLOCKED') {
                      this.globFunc.globalLodingDismiss();
                      alert('Acc Blocked, please contact administrator!');
                    } else if (status == 'FAILED') {
                      this.globFunc.globalLodingDismiss();
                      alert('Username or Password Invalid!!');
                    } else {
                      this.globFunc.globalLodingDismiss();
                      alert((<any>data).Status);
                    }
                  } else {
                    this.globFunc.globalLodingDismiss();
                    this.logResult = undefined;
                    alert((<any>data).Status);
                  }
                },
                (err) => {
                  if (err.name == 'TimeoutError') {
                    this.globFunc.globalLodingDismiss();
                    alert(err.message);
                  } else {
                    this.globFunc.globalLodingDismiss();
                    alert('No Response from Server!');
                  }
                }
              )
              .catch((err) => {
                this.globFunc.globalLodingDismiss();
                alert('No Response from Server!');
              });
          }
        }
      },
      (err) => {
        console.log('error: ' + err);
      }
    );
  }

  getversion() {
    this.sqliteProvider.getversionDetails().then((data) => {
      this.masterData = {
        Setupmastval: {
          setupfinal: '0',
          setupversion: '0',
          setupmodule: 'VL',
        },
      };
      if (data.length > 0) {
        let version = data[0].version;
        console.log(version, 'version inside setupresp call');
        this.masterData = {
          Setupmastval: {
            setupfinal: version,
            setupversion: version,
            setupmodule: 'VL',
          },
        };
        this.master.restApiCallAngular('Setupresp', this.masterData).then(
          (result) => {
            if (result != undefined && result != null && result != '') {
              if (version == (<any>result).version) {
                // this.versionvalue = (<any>result).version;
                this.checklogin();
              } else {
                if ((<any>result).errorCode === '000') {
                  this.getProductList();
                  // this.getBasicMastersListNew();
                } else if ((<any>result).errorCode === '002') {
                  this.checklogin();
                } else {
                  this.globFunc.globalLodingDismiss();
                  this.globFunc.showAlert('Alert', (<any>result).errorDesc);
                }
              }
            }
          },
          (err) => {
            if (err.name == 'TimeoutError') {
              this.globFunc.globalLodingDismiss();
              alert(err.message);
            } else {
              this.globFunc.globalLodingDismiss();
              alert('No Response from Server!');
            }
          }
        );
      } else {
        this.checklogin();
      }
    });
  }

  checklogin() {
    this.sqliteProvider
      .getDocuments()
      .then((data) => {
        // console.log(data);
        if (data.length > 0) {
          // this.loading.dismiss();
          this.globFunc.globalLodingDismiss();
          this.userData.username = '';
          this.userData.password = '';
          this.globalData.loginUserName(true);
          this.router.navigate(['/JsfhomePage'], {
            queryParams: { username: this.userData.username },
            skipLocationChange: true,
            replaceUrl: true,
          });
        } else {
          if (this.network.type == 'none' || this.network.type == 'unknown') {
            this.globFunc.globalLodingDismiss();
            this.globFunc.showAlert(
              'Alert',
              'Enable Internet connection / First Time Login Must be Online.'
            );
          } else {
            this.getProductList();
            // this.getBasicMastersListNew();
          }
        }
      })
      .catch((Error) => {
        console.log('Failed!');
        //this.showAlert("Alert!", "Failed!");
      });
  }

  getUserGroupsNames(value) {
    let userGroup;
    let username = value;
    this.sqliteProvider.getUserIDLoginDetails(username).then((data) => {
      if (data.length > 0) {
        userGroup = JSON.parse(data[0].userGroups);
        for (let i = 0; i < userGroup.length; i++) {
          this.sqliteProvider
            .getUserGroupsNameBasedOnId(userGroup[i])
            .then((data) => {
              this.userGroupsName.push(data[0].UserGroupName);
            });
        }
      }
    });
  }

  // this is new way for fetching masters

  getBasicMastersListNew() {
    this.master.restApiCallAngular('Setupresp', this.masterData).then(
      (result) => {
        const vlResult = result;
        this.masterDataValues = (<any>vlResult).Setupmaster;
        console.log(this.masterDataValues, 'VL Masters Setupresp');
        if (result != undefined && result != null && result != '') {
          if ((<any>result).errorCode === '000') {
            this.masterDataValuesTest = (<any>result).Setupmaster;
            console.log(this.masterDataValuesTest, 'HL Masters Setupresp');
            this.versionvalue = (<any>result).version;
            this.sqliteProvider
              .removeAllMasterData('CustomerType')
              .then((data) => {
                if (
                  !this.isEmpty(this.masterDataValues.CustomerType) &&
                  this.masterDataValues.CustomerType.length > 0
                ) {
                  this.sqlSupport
                    .insertAllMasterData(
                      this.masterDataValues.CustomerType,
                      'CustomerType'
                    )
                    .then((data) => {
                      this.getStateListNew();
                    });
                } else {
                  this.globFunc.globalLodingDismiss();
                  this.globFunc.showAlert(
                    'Alert!',
                    'Customer Type values are empty!'
                  );
                }
              });
          } else if ((<any>result).errorCode === '002') {
            this.checklogin();
          } else {
            this.globFunc.globalLodingDismiss();
            alert((<any>result).errorDesc);
          }
        }
      },
      (err) => {
        if (err.name == 'TimeoutError') {
          this.globFunc.globalLodingDismiss();
          alert(err.message);
        } else {
          this.globFunc.globalLodingDismiss();
          alert('No Response from Server!');
        }
      }
    );
  }

  getStateListNew() {
    if (
      !this.isEmpty(this.masterDataValues.StateCityMaster) &&
      this.masterDataValues.StateCityMaster.length > 0
    ) {
      this.sqliteProvider.removeStateCity().then((data) => {
        this.sqlSupport
          .InsertStateCity(this.masterDataValues.StateCityMaster)
          .then((data) => {
            this.getAgriProofNew();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'State City Master values are empty!');
    }
  }

  getAgriProofNew() {
    if (
      !this.isEmpty(this.masterDataValues.AgriProof) &&
      this.masterDataValues.AgriProof.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('AgriProof').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.AgriProof, 'AgriProof')
          .then((data) => {
            this.globFunc.globalLodingDismiss();
            // this.newMasters.getProductList(this.masterDataValues, this.userData);
            this.userData.username = '';
            this.userData.password = '';
            this.globalData.loginUserName(true);
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'AgriProof values are empty!');
    }
  }

  // this is old format to fetch masters
  getProductList() {
    this.master.restApiCallAngular('Setupresp', this.masterData).then(
      (result) => {
        const vlResult = result;
        this.masterDataValues = (<any>vlResult).Setupmaster;
        console.log(this.masterDataValues, 'VL Masters Setupresp');
        if (result != undefined && result != null && result != '') {
          if ((<any>result).errorCode === '000') {
            this.masterDataValuesTest = (<any>result).Setupmaster;
            console.log(this.masterDataValuesTest, 'HL Masters Setupresp');
            this.versionvalue = (<any>result).version;

            this.sqliteProvider.removeProduct().then((data) => {
              if (
                !this.isEmpty(this.masterDataValues.ProductMaster) &&
                this.masterDataValues.ProductMaster.length > 0
              ) {
                this.sqlSupport
                  .InsertProductValue(this.masterDataValues.ProductMaster)
                  .then((data) => {
                    this.getOrganisations();
                  });
              } else {
                this.globFunc.globalLodingDismiss();
                this.globFunc.showAlert(
                  'Alert!',
                  'Product list values are empty!'
                );
              }
            });
          } else if ((<any>result).errorCode === '002') {
            this.checklogin();
          } else {
            this.globFunc.globalLodingDismiss();
            alert((<any>result).errorDesc);
          }
        }
      },
      (err) => {
        if (err.name == 'TimeoutError') {
          this.globFunc.globalLodingDismiss();
          alert(err.message);
        } else {
          this.globFunc.globalLodingDismiss();
          alert('No Response from Server!');
        }
      }
    );
  }

  getOrganisations() {
    // hasOwnProperty
    if (
      !this.isEmpty(this.masterDataValues.OrganizationMaster) &&
      this.masterDataValues.OrganizationMaster.length > 0
    ) {
      this.sqliteProvider.removeOrganisation().then((data) => {
        this.sqlSupport
          .InsertOrganisation(this.masterDataValues.OrganizationMaster)
          .then((data) => {
            this.getRepayments();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Organizations values are empty!');
    }
  }

  getRepayments() {
    if (
      !this.isEmpty(this.masterDataValues.ModeofRepayment) &&
      this.masterDataValues.ModeofRepayment.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('ModeofRepayment')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.ModeofRepayment,
              'ModeofRepayment'
            )
            .then((data) => {
              this.getPromoCode();
            });

          // }
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Mode of repayment values are empty!');
    }
  }

  getPromoCode() {
    if (
      !this.isEmpty(this.masterDataValues.PromoCode) &&
      this.masterDataValues.PromoCode.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('PromoCode').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.PromoCode, 'PromoCode')
          .then((data) => {
            this.getSourcingChannel();
          });
        // }
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'PromoCode values are empty!');
    }
  }

  getSourcingChannel() {
    if (
      !this.isEmpty(this.masterDataValues.SourcingChannel) &&
      this.masterDataValues.SourcingChannel.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('SourcingChannel')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.SourcingChannel,
              'SourcingChannel'
            )
            .then((data) => {
              this.getSourcingIdName();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Sourcing channel values are empty!');
    }
  }

  getSourcingIdName() {
    if (this.masterDataValues.SourcingMaster.length > 0) {
      this.sqliteProvider.removeSourcingIdName().then((data) => {
        // for (var i = 0; i < this.masterDataValues.SourcingMaster.length; i++) {
        //   this.sqliteProvider.insertSourcingIdName(this.masterDataValues.SourcingMaster[i]);
        //   if (i == this.masterDataValues.SourcingMaster.length - 1) {
        //     this.getPurposeList();
        //   }
        // }
        this.sqliteProvider
          .insertSourcingIdName(this.masterDataValues.SourcingMaster)
          .then((data) => {
            this.getPurposeList();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Sourcing ID Master values are empty!');
    }
  }

  getPurposeList() {
    if (
      !this.isEmpty(this.masterDataValues.PurposeOfLoan) &&
      this.masterDataValues.PurposeOfLoan.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('PurposeOfLoan').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.PurposeOfLoan,
            'PurposeOfLoan'
          )
          .then((data) => {
            this.getPurposeofLoanVL();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Purpose of Loan values are empty!');
    }
  }

  getPurposeofLoanVL() {
    if (
      !this.isEmpty(this.masterDataValues.PurposeOfLoanVL) &&
      this.masterDataValues.PurposeOfLoanVL.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('PurposeOfLoanVL')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.PurposeOfLoanVL,
              'PurposeOfLoanVL'
            )
            .then((data) => {
              this.getTypeOfCase();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Purpose of Loan VL values are empty!');
    }
  }

  getTypeOfCase() {
    if (
      !this.isEmpty(this.masterDataValues.TypeofCase) &&
      this.masterDataValues.TypeofCase.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('TypeofCase').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.TypeofCase, 'TypeofCase')
          .then((data) => {
            this.getCustomerType();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Type of Case values are empty!');
    }
  }

  getCustomerType() {
    if (
      !this.isEmpty(this.masterDataValues.CustomerType) &&
      this.masterDataValues.CustomerType.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('CustomerType').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.CustomerType,
            'CustomerType'
          )
          .then((data) => {
            this.getNachType();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Customer Type values are empty!');
    }
  }

  getNachType() {
    if (
      !this.isEmpty(this.masterDataValues.Nachaccounttype) &&
      this.masterDataValues.Nachaccounttype.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('Nachaccounttype')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.Nachaccounttype,
              'Nachaccounttype'
            )
            .then((data) => {
              this.getEmploymentStatus();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Customer Type values are empty!');
    }
  }

  getEmploymentStatus() {
    if (
      !this.isEmpty(this.masterDataValues.OccupationTwovl) &&
      this.masterDataValues.OccupationTwovl.length > 0
    ) {
      // As per sarath
      this.sqliteProvider
        .removeAllMasterData('OccupationTwovl')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.OccupationTwovl,
              'OccupationTwovl'
            )
            .then((data) => {
              this.getTitleMaster();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Occupation Type values are empty!');
    }
  }

  getTitleMaster() {
    if (
      !this.isEmpty(this.masterDataValues.TitleMaster) &&
      this.masterDataValues.TitleMaster.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('TitleMaster').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.TitleMaster, 'TitleMaster')
          .then((data) => {
            this.aadharAsPerKyc();
            // this.getCasteMaster();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Title Master values are empty!');
    }
  }

  aadharAsPerKyc() {
    if (
      !this.isEmpty(this.masterDataValues.AddressAsPerKyc) &&
      this.masterDataValues.AddressAsPerKyc.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('AddressAsPerKyc')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.AddressAsPerKyc,
              'AddressAsPerKyc'
            )
            .then((data) => {
              this.otherDocuments();
              // this.getCasteMaster();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'AddressAsPerKyc values are empty!');
    }
  }

  otherDocuments() {
    if (
      !this.isEmpty(this.masterDataValues.OtherDocuments) &&
      this.masterDataValues.OtherDocuments.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('OtherDocuments').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.OtherDocuments,
            'OtherDocuments'
          )
          .then((data) => {
            this.getCasteMaster();
            // this.getCasteMaster();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'OtherDocuments values are empty!');
    }
  }

  getCasteMaster() {
    if (
      !this.isEmpty(this.masterDataValues.Caste) &&
      this.masterDataValues.Caste.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('Caste').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.Caste, 'Caste')
          .then((data) => {
            this.getReligionMaster();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Caste values are empty!');
    }
  }

  getReligionMaster() {
    if (
      !this.isEmpty(this.masterDataValues.Religion) &&
      this.masterDataValues.Religion.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('Religion').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.Religion, 'Religion')
          .then((data) => {
            this.getNoofyearsresidence();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Religion values are empty!');
    }
  }

  getNoofyearsresidence() {
    if (
      !this.isEmpty(this.masterDataValues.Noofyearsresidence) &&
      this.masterDataValues.Noofyearsresidence.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('Noofyearsresidence')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.Noofyearsresidence,
              'Noofyearsresidence'
            )
            .then((data) => {
              this.getEducationMaster();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'No of years residence values are empty!'
      );
    }
  }

  getEducationMaster() {
    if (
      !this.isEmpty(this.masterDataValues.Education) &&
      this.masterDataValues.Education.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('Education').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.Education, 'Education')
          .then((data) => {
            this.getVehiclescheme();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Education values are empty!');
    }
  }

  getVehiclescheme() {
    if (
      !this.isEmpty(this.masterDataValues.Vehiclescheme) &&
      this.masterDataValues.Vehiclescheme.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('Vehiclescheme').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.Vehiclescheme,
            'Vehiclescheme'
          )
          .then((data) => {
            this.getVLTenure();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Vehicle scheme values are empty!');
    }
  }

  getVLTenure() {
    if (
      !this.isEmpty(this.masterDataValues.VLTenure) &&
      this.masterDataValues.VLTenure.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('VLTenure').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.VLTenure, 'VLTenure')
          .then((data) => {
            this.getAddressType();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'VL Tenure values are empty!');
    }
  }

  getAddressType() {
    if (
      !this.isEmpty(this.masterDataValues.AddressType) &&
      this.masterDataValues.AddressType.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('AddressType').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.AddressType, 'AddressType')
          .then((data) => {
            this.getMaritalStatus();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'AddressType values are empty!');
    }
  }

  getMaritalStatus() {
    if (
      !this.isEmpty(this.masterDataValues.MaritalStatus) &&
      this.masterDataValues.MaritalStatus.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('MaritalStatus').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.MaritalStatus,
            'MaritalStatus'
          )
          .then((data) => {
            this.getOwnershipstatus();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Marital Status values are empty!');
    }
  }

  getOwnershipstatus() {
    if (
      !this.isEmpty(this.masterDataValues.Ownershipstatus) &&
      this.masterDataValues.Ownershipstatus.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('Ownershipstatus')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.Ownershipstatus,
              'Ownershipstatus'
            )
            .then((data) => {
              this.getVintageofService();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Ownership status values are empty!');
    }
  }

  getVintageofService() {
    if (
      !this.isEmpty(this.masterDataValues.VintageofService) &&
      this.masterDataValues.VintageofService.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('VintageofService')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.VintageofService,
              'VintageofService'
            )
            .then((data) => {
              this.getConstitution();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Vintage of Service values are empty!');
    }
  }

  getConstitution() {
    if (
      !this.isEmpty(this.masterDataValues.Constitution) &&
      this.masterDataValues.Constitution.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('Constitution').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.Constitution,
            'Constitution'
          )
          .then((data) => {
            this.getDealer();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Constitution values are empty!');
    }
  }

  getDealer() {
    if (
      !this.isEmpty(this.masterDataValues.DealerMaster) &&
      this.masterDataValues.DealerMaster.length > 0
    ) {
      this.sqliteProvider.removeAllDealerMasterData().then((data) => {
        this.sqlSupport
          .insertDealerMaster(this.masterDataValues.DealerMaster)
          .then((data) => {
            this.getIndustryType();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Dealer Master values are empty!');
    }
  }

  getIndustryType() {
    if (
      !this.isEmpty(this.masterDataValues.IndustryType) &&
      this.masterDataValues.IndustryType.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('IndustryType').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.IndustryType,
            'IndustryType'
          )
          .then((data) => {
            this.getNatureofBussiness();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Industry Type values are empty!');
    }
  }

  getNatureofBussiness() {
    if (
      !this.isEmpty(this.masterDataValues.NatureofBussiness) &&
      this.masterDataValues.NatureofBussiness.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('NatureofBussiness')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.NatureofBussiness,
              'NatureofBussiness'
            )
            .then((data) => {
              this.getPeriodInstallments();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'Nature of Bussiness values are empty!'
      );
    }
  }

  getPeriodInstallments() {
    if (
      !this.isEmpty(this.masterDataValues.PeriodicityInstalment) &&
      this.masterDataValues.PeriodicityInstalment.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('PeriodicityInstalment')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.PeriodicityInstalment,
              'PeriodicityInstalment'
            )
            .then((data) => {
              this.getInterestRate();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'Periodicity Instalment values are empty!'
      );
    }
  }

  getInterestRate() {
    if (
      !this.isEmpty(this.masterDataValues.IntRateMaster) &&
      this.masterDataValues.IntRateMaster.length > 0
    ) {
      this.sqliteProvider.removeInterestRate().then((data) => {
        this.sqlSupport
          .InsertInterestRate(this.masterDataValues.IntRateMaster)
          .then((data) => {
            this.getStateList();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'Interest Rate Master values are empty!'
      );
    }
  }

  getStateList() {
    if (
      !this.isEmpty(this.masterDataValues.StateCityMaster) &&
      this.masterDataValues.StateCityMaster.length > 0
    ) {
      this.sqliteProvider.removeStateCity().then((data) => {
        this.sqlSupport
          .InsertStateCity(this.masterDataValues.StateCityMaster)
          .then((data) => {
            this.getBusinessDescription();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'State City Master values are empty!');
    }
  }

  getBusinessDescription() {
    if (
      !this.isEmpty(this.masterDataValues.BusinessDescription) &&
      this.masterDataValues.BusinessDescription.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('BusinessDescription')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.BusinessDescription,
              'BusinessDescription'
            )
            .then((data) => {
              this.getPaymentsDetails();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'Business Description values are empty!'
      );
    }
  }
  getPaymentsDetails() {
    if (
      !this.isEmpty(this.masterDataValues.PaymentDetails) &&
      this.masterDataValues.PaymentDetails.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('PaymentDetails').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.PaymentDetails,
            'PaymentDetails'
          )
          .then((data) => {
            this.getRelationShipList();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Payment Details values are empty!');
    }
  }
  getRelationShipList() {
    if (
      !this.isEmpty(this.masterDataValues.RelationShip) &&
      this.masterDataValues.RelationShip.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('RelationShip').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.RelationShip,
            'RelationShip'
          )
          .then((data) => {
            this.getRefRelationShipList();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Relationship values are empty!');
    }
  }

  getRefRelationShipList() {
    if (
      !this.isEmpty(this.masterDataValues.VLRelationShip) &&
      this.masterDataValues.VLRelationShip.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('VLRelationShip').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.VLRelationShip,
            'VLRelationShip'
          )
          .then((data) => {
            this.getResidenceStatus();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'Reference Relationship values are empty!'
      );
    }
  }

  getResidenceStatus() {
    if (
      !this.isEmpty(this.masterDataValues.ResidenceStatus) &&
      this.masterDataValues.ResidenceStatus.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('ResidenceStatus')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.ResidenceStatus,
              'ResidenceStatus'
            )
            .then((data) => {
              this.getGenderList();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Residence Status values are empty!');
    }
  }

  getGenderList() {
    if (
      !this.isEmpty(this.masterDataValues.Gender) &&
      this.masterDataValues.Gender.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('Gender').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.Gender, 'Gender')
          .then((data) => {
            this.getBankMaster();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Gender values are empty!');
    }
  }

  getBankMaster() {
    if (
      !this.isEmpty(this.masterDataValues.BankMaster) &&
      this.masterDataValues.BankMaster.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('BankMaster').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.BankMaster, 'BankMaster')
          .then((data) => {
            this.getPreferredLanguage();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Bank Master values are empty!');
    }
  }

  getPreferredLanguage() {
    if (
      !this.isEmpty(this.masterDataValues.Language) &&
      this.masterDataValues.Language.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('Language').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.Language, 'Language')
          .then((data) => {
            this.getProductScheme();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Language values are empty!');
    }
  }

  getProductScheme() {
    if (
      !this.isEmpty(this.masterDataValues.ProductScheme) &&
      this.masterDataValues.ProductScheme.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('ProductScheme').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.ProductScheme,
            'ProductScheme'
          )
          .then((data) => {
            this.getTypeoftwowheeler();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Product Scheme values are empty!');
    }
  }

  getTypeoftwowheeler() {
    if (
      !this.isEmpty(this.masterDataValues.Typeoftwowheeler) &&
      this.masterDataValues.Typeoftwowheeler.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('Typeoftwowheeler')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.Typeoftwowheeler,
              'Typeoftwowheeler'
            )
            .then((data) => {
              this.getaccountType();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'Type of two wheeler values are empty!'
      );
    }
  }

  getaccountType() {
    if (
      !this.isEmpty(this.masterDataValues.AccountType) &&
      this.masterDataValues.AccountType.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('AccountType').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.AccountType, 'AccountType')
          .then((data) => {
            this.getOperationInstruction();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Account Type values are empty!');
    }
  }

  getOperationInstruction() {
    if (
      !this.isEmpty(this.masterDataValues.OperationInstruction) &&
      this.masterDataValues.OperationInstruction.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('OperationInstruction')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.OperationInstruction,
              'OperationInstruction'
            )
            .then((data) => {
              this.getModeOfOperation();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'Operation Instruction values are empty!'
      );
    }
  }

  getModeOfOperation() {
    if (
      !this.isEmpty(this.masterDataValues.ModeofOperation) &&
      this.masterDataValues.ModeofOperation.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('ModeofOperation')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.ModeofOperation,
              'ModeofOperation'
            )
            .then((data) => {
              this.getSegmentType();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Mode of Operation values are empty!');
    }
  }

  getSegmentType() {
    if (
      !this.isEmpty(this.masterDataValues.SegmentType) &&
      this.masterDataValues.SegmentType.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('SegmentType').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.SegmentType, 'SegmentType')
          .then((data) => {
            this.getScoreCardMasters();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Segment Type values are empty!');
    }
  }

  getHospicashInsMaster() {
    if (
      !this.isEmpty(this.masterDataValues.vlHospicashInsurances) &&
      this.masterDataValues.vlHospicashInsurances.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('HospicashIns').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.vlHospicashInsurances,
            'HospicashIns'
          )
          .then((data) => {
            this.getScoreCardMasters();
          });
      });
    } else {
      this.globalData.globalLodingDismiss();
      this.globalData.showAlert(
        'Alert!',
        'vlHospicashInsurances Master values are empty!'
      );
      // this.globFunc.confirmationVersionAlert("Alert!", "vlHospicashInsurances Master values are empty!").then(data => {
      this.getScoreCardMasters();
      // })
    }
  }

  getScoreCardMasters() {
    if (
      !this.isEmpty(this.masterDataValues.VehicleScoreCardMaster) &&
      this.masterDataValues.VehicleScoreCardMaster.length > 0
    ) {
      this.sqliteProvider.removeAllScoreCardMasterData().then((data) => {
        this.sqlSupport
          .insertAllScoreCardMasterData(
            this.masterDataValues.VehicleScoreCardMaster
          )
          .then((data) => {
            this.getVehicleWorkflowMasters();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert(
        'Alert!',
        'Vehicle ScoreCard Master values are empty!'
      );
    }
  }
  // ----------------------------------- Functiones Not Required For ORP Api -----------------------------------------
  getVehicleBrandMasters() {
    if (
      !this.isEmpty(this.masterDataValues.VehiclesBrand) &&
      this.masterDataValues.VehiclesBrand.length > 0
    ) {
      this.sqliteProvider.removeAllVehicleBrandMasters().then((data) => {
        this.sqlSupport
          .insertAllVehicleBrandMasters(this.masterDataValues.VehiclesBrand)
          .then((data) => {
            this.getVehicleModelMasters();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Vehicles Brand values are empty!');
    }
  }
  getVehicleModelMasters() {
    if (
      !this.isEmpty(this.masterDataValues.VehicleModels) &&
      this.masterDataValues.VehicleModels.length > 0
    ) {
      this.sqliteProvider.removeAllVehicleModelMasters().then((data) => {
        this.sqlSupport
          .insertAllVehicleModelMasters(this.masterDataValues.VehicleModels)
          .then((data) => {
            this.getVehicleVariantMasters();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Vehicle Models values are empty!');
    }
  }
  getVehicleVariantMasters() {
    if (
      !this.isEmpty(this.masterDataValues.vehicleVariant) &&
      this.masterDataValues.vehicleVariant.length > 0
    ) {
      this.sqliteProvider.removeAllVehicleVariantMasters().then((data) => {
        this.sqlSupport
          .insertAllVehicleVariantMasters(this.masterDataValues.vehicleVariant)
          .then((data) => {
            this.getVehiclePricesMasters();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'vehicle Variant values are empty!');
    }
  }
  getVehiclePricesMasters() {
    if (
      !this.isEmpty(this.masterDataValues.vehiclePrices) &&
      this.masterDataValues.vehiclePrices.length > 0
    ) {
      this.sqliteProvider.removeAllVehiclePricesMasters().then((data) => {
        this.sqlSupport
          .insertAllVehiclePriceMasters(this.masterDataValues.vehiclePrices)
          .then((data) => {
            this.getVehicleWorkflowMasters();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'vehicle Prices values are empty!');
    }
  }
  // ----------------------------------- Functiones Not Required For ORP Api -----------------------------------------
  getVehicleWorkflowMasters() {
    if (
      !this.isEmpty(this.masterDataValues.VehicleWorkflow) &&
      this.masterDataValues.VehicleWorkflow.length > 0
    ) {
      this.sqliteProvider.removeAllVehicleWorkflowMasters().then((data) => {
        this.sqlSupport
          .insertAllVehicleWorkflowMasters(
            this.masterDataValues.VehicleWorkflow
          )
          .then((data) => {
            this.getDocumentsVehicle();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Vehicle Workflow values are empty!');
    }
  }

  getDocumentsVehicle() {
    if (
      !this.isEmpty(this.masterDataValues.DocumentsVehicle) &&
      this.masterDataValues.DocumentsVehicle.length > 0
    ) {
      this.sqliteProvider
        .removeAllDocumentsVehicle('DocumentsVehicle')
        .then((data) => {
          this.sqlSupport
            .insertAllDocumentsVehicle(
              this.masterDataValues.DocumentsVehicle,
              'DocumentsVehicle'
            )
            .then((data) => {
              // this.getProcessingFees();
              this.getPddChargesMaster();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'DocumentsVehicle values are empty!');
    }
  }

  getPddChargesMaster() {
    if (
      !this.isEmpty(this.masterDataValues.PrdPddChargesMaster) &&
      this.masterDataValues.PrdPddChargesMaster.length > 0
    ) {
      this.sqlSupport.removeAllPddChargesMaster().then((data) => {
        this.sqlSupport
          .insertAllPddChargesMaster(this.masterDataValues.PrdPddChargesMaster)
          .then((data) => {
            this.getLoanProtectInsurance();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'DocumentsVehicle values are empty!');
    }
  }

  getLoanProtectInsurance() {
    if (
      !this.isEmpty(this.masterDataValues.LoanProtectInsurance) &&
      this.masterDataValues.LoanProtectInsurance.length > 0
    ) {
      this.sqlSupport.removeAllLoanProtectInsurance().then((data) => {
        this.sqlSupport
          .insertAllLoanProtectInsurance(
            this.masterDataValues.LoanProtectInsurance
          )
          .then((data) => {
            this.getProcessingFees();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'LPI Insurance values are empty!');
    }
  }
  getProcessingFees() {
    if (
      !this.isEmpty(this.masterDataValues.ProcessingFee) &&
      this.masterDataValues.ProcessingFee.length > 0
    ) {
      this.sqliteProvider.removeAllProcessingFees().then((data) => {
        this.sqliteProvider
          .insertAllProcessingFees(this.masterDataValues.ProcessingFee)
          .then((data) => {
            this.getAgriProof();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Processing fees values are empty!');
    }
  }

  getAgriProof() {
    if (
      !this.isEmpty(this.masterDataValues.AgriProof) &&
      this.masterDataValues.AgriProof.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('AgriProof').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.AgriProof, 'AgriProof')
          .then((data) => {
            this.getAgriformertype();
          });
        // }
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'AgriProof values are empty!');
    }
  }

  getAgriformertype() {
    if (
      !this.isEmpty(this.masterDataValues.Agriformertype) &&
      this.masterDataValues.Agriformertype.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('Agriformertype').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.Agriformertype,
            'Agriformertype'
          )
          .then((data) => {
            this.getAgriactivitytype();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Agriformertype values are empty!');
    }
  }

  getAgriactivitytype() {
    if (
      !this.isEmpty(this.masterDataValues.Agriactivitytype) &&
      this.masterDataValues.Agriactivitytype.length > 0
    ) {
      this.sqliteProvider
        .removeAllMasterData('Agriactivitytype')
        .then((data) => {
          this.sqlSupport
            .insertAllMasterData(
              this.masterDataValues.Agriactivitytype,
              'Agriactivitytype'
            )
            .then((data) => {
              this.getAgriPurpose();
            });
        });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Agriactivitytype values are empty!');
    }
  }

  getAgriPurpose() {
    if (
      !this.isEmpty(this.masterDataValues.AgriPurpose) &&
      this.masterDataValues.AgriPurpose.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('AgriPurpose').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.AgriPurpose, 'AgriPurpose')
          .then((data) => {
            this.getMajorActivity();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'AgriPurpose values are empty!');
    }
  }

  getMajorActivity() {
    if (
      !this.isEmpty(this.masterDataValues.MajorActivity) &&
      this.masterDataValues.MajorActivity.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('MajorActivity').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.MajorActivity,
            'MajorActivity'
          )
          .then((data) => {
            this.getServiceUnits();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'MajorActivity values are empty!');
    }
  }

  getServiceUnits() {
    if (
      !this.isEmpty(this.masterDataValues.ServiceUnits) &&
      this.masterDataValues.ServiceUnits.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('ServiceUnits').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.ServiceUnits,
            'ServiceUnits'
          )
          .then((data) => {
            this.getClassUdyam();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'ServiceUnits values are empty!');
    }
  }

  getClassUdyam() {
    if (
      !this.isEmpty(this.masterDataValues.ClassUdyam) &&
      this.masterDataValues.ClassUdyam.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('ClassUdyam').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.ClassUdyam, 'ClassUdyam')
          .then((data) => {
            this.getAnnualIncome();
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'ClassUdyam values are empty!');
    }
  }

  getAnnualIncome() {
    if (
      !this.isEmpty(this.masterDataValues.AnnualIncome) &&
      this.masterDataValues.AnnualIncome.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('AnnualIncome').then((data) => {
        this.sqlSupport
          .insertAllMasterData(
            this.masterDataValues.AnnualIncome,
            'AnnualIncome'
          )
          .then((data) => {
            this.getYesNo();
          });
      });
    } else {
      this.globalData.globalLodingDismiss();
      this.globalData.showAlert('Alert!', 'Annual Income values are empty!');
    }
  }

  getYesNo() {
    if (
      !this.isEmpty(this.masterDataValues.YesNo) &&
      this.masterDataValues.YesNo.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('YesNo').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.YesNo, 'YesNo')
          .then((data) => {
            this.getVehicleAge();
          });
      });
    } else {
      this.globalData.globalLodingDismiss();
      this.globalData.showAlert('Alert!', 'YesNo values are empty!');
    }
  }

  getVehicleAge() {
    if (
      !this.isEmpty(this.masterDataValues.VehicleAge) &&
      this.masterDataValues.VehicleAge.length > 0
    ) {
      this.sqliteProvider.removeAllMasterData('VehicleAge').then((data) => {
        this.sqlSupport
          .insertAllMasterData(this.masterDataValues.VehicleAge, 'VehicleAge')
          .then((data) => {
            this.getStampDutyMaster();
          });
      });
    } else {
      this.globalData.globalLodingDismiss();
      this.globalData.showAlert('Alert!', 'Vehicle Age values are empty!');
    }
  }

  getStampDutyMaster() {
    if (
      !this.isEmpty(this.masterDataValues.StampDutyMasterData) &&
      this.masterDataValues.StampDutyMasterData.length > 0
    ) {
      this.sqlSupport.removeStampMasterData().then((data) => {
        // this.sqlSupport.insertStampDutyMaster(this.masterDataValues.StampDutyMasterData).then(data => {
        //   this.getTypeOfCase();
        // })
        for (
          var i = 0;
          i < this.masterDataValues.StampDutyMasterData.length;
          i++
        ) {
          this.sqlSupport.insertStampDutyMaster(
            this.masterDataValues.StampDutyMasterData[i]
          );
          if (i == this.masterDataValues.StampDutyMasterData.length - 1) {
            this.getDocuments();
          }
        }
      });
    } else {
      this.globalData.globalLodingDismiss();
      this.globalData.showAlert(
        'Alert!',
        'Purpose of Loan VL values are empty!'
      );
    }
  }

  getDocuments() {
    if (
      !this.isEmpty(this.masterDataValues.DocumentMaster) &&
      this.masterDataValues.DocumentMaster.length > 0
    ) {
      this.sqliteProvider.removeDocuments().then((data) => {
        // for (var i = 0; i < this.masterDataValues.DocumentMaster.length; i++) {
        this.sqliteProvider
          .InsertDocuments(this.masterDataValues.DocumentMaster)
          .then((data) => {
            this.sqliteProvider
              .insertversionDetails(this.versionvalue)
              .then((data) => {
                this.globFunc.globalLodingDismiss();
                this.userData.username = '';
                this.userData.password = '';
                this.globalData.loginUserName(true);
                this.router.navigate(['/JsfhomePage'], {
                  queryParams: { username: this.userData.username },
                  skipLocationChange: true,
                  replaceUrl: true,
                });
              });
          });
      });
    } else {
      this.globFunc.globalLodingDismiss();
      this.globFunc.showAlert('Alert!', 'Document Master values are empty!');
    }
  }

  openfile() {
    try {
      this.fileRef.nativeElement.click();
    } catch (err) {
      console.log(err);
      this.globFunc.showAlert('Alert!', JSON.stringify(err));
    }
  }

  async test() {
    debugger;
    this.globFunc.takeImage('document').then((res: any) => {
      let imgName = res.path;
      MantraRDService.convertToWebP(
        imgName,
        (result) => {
          console.log('WebP Image Base64: ', result.data);
          // Handle the result, such as displaying the image
        },
        (error) => {
          console.error('Error converting image: ', error);
        }
      );
    });
  }

  async convertToWebPBase64(data, sizeReq?: number) {
    try {
      this.globFunc.globalLodingPresent('Please Wait...');
      let webpResult;
      if (ImageCompression) {
        const result = await ImageCompression.convertToWebP({
          base64: data,
        });
        if (result) {
          let pathData = result.data;
          let size = result.data.length / 1000;
          let chargesFormatValue = size.toFixed(2).toString().split('.');
          if (chargesFormatValue[1] <= '49') {
            size = Math.floor(size);
          } else {
            size = Math.ceil(size);
          }
          webpResult = { path: pathData, size: size };
          this.globFunc.globalLodingDismiss();
          return webpResult;
        } else {
          this.globFunc.globalLodingDismiss();
        }
      }
      this.globFunc.globalLodingDismiss();
    } catch (e) {
      this.globFunc.globalLodingDismiss();
      alert(`Error From WebPConvertor Plugin => ${e}`);
    }
  }

  showLoader: boolean = false;

  // Method to show loader temporarily
  showLoaderTemporarily() {
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
    }, 3000); // Change duration as needed
  }
}
