import { Injectable } from '@angular/core';
import * as X2JS from 'x2js';
import * as moment from 'moment';
import { GlobalService } from '../global.service';
import { SqliteService } from '../sqlite.service';
import * as AppType from '../../utility/AppInterfaces';
import * as AppConst from '../../utility/AppConstants';
import { rejects } from 'assert';

declare var EsysRDService;
declare var RDService;
declare var MRDService;
var capturexml = '';

@Injectable({
  providedIn: 'root',
})
export class BioNavigatorService {
  BTName: string;
  _timeout = 30000;
  _pidVersion = '2.0';
  format = 0;
  _fType = 2; // Prod & PreProd
  _fCoutn = 1;
  _iCount = ''; //L1Device
  _iType = ''; //L1Device
  _environment = 'PP'; //PROD, L1Device
  // _environment = "PP";      //UAT, L1Device
  _demotag = '';
  _bluetoothConnection = 'N';
  _btName = '';
  _dmac = '';
  _wadh = 'E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=';
  _otp = '';
  _pidOptionsXML: any;
  jsonData: Record<string, string | number | any>;
  error: string;
  bioDevices: AppType.BioDeviceConfig[] = [
    {
      code: '1',
      name: 'Evolute Idemia RD',
    },
    {
      code: '2',
      name: 'Mantra MFS110 RD',
    },
    {
      code: '3',
      name: 'ACPL FM220 RD',
    },
  ];

  constructor(public globalData: GlobalService, public sqlite: SqliteService) {}

  /**
   * @method selectedDevice
   * @description Function helps to generate fingerPrint PID Data from evolute Idemia L1 Device.
   * @author HariHaraSuddhan S
   */
  selectedDevice(DName: string) {
    try {
      return new Promise(async (resolve, reject) => {
        switch (DName) {
          case this.bioDevices[0].code:
            const data = await this.L1_RD_Service(EsysRDService);
            resolve(JSON.stringify(data));
            break;
          case this.bioDevices[1].code:
            const data_1 = await this.L1_RD_Service(MRDService);
            resolve(JSON.stringify(data_1));
            break;
          case this.bioDevices[2].code:
            const data_2 = await this.L1_RD_Service(RDService);
            resolve(JSON.stringify(data_2));
            break;
        }
      });
    } catch (err) {
      this.sqlite.addAuditTrail(
        moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        'selectedDevice',
        'selectedDevice',
        JSON.stringify(err)
      );
      rejects(err);
    }
  }

  /**
   * @method L1_RD_Service
   * @description Function helps to generate fingerPrint PID Data from RD Service L1 Device.
   * @author HariHaraSuddhan S
   */
  L1_RD_Service(deviceName: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.getGetPidOptionsXML(deviceName);
        if (data) {
          this._pidOptionsXML = data;
          deviceName.vCapture(
            (data_1) => {
              if ((<any>data_1)[0].res_code == 0) {
                var x2js = new X2JS();
                var jsonData = x2js.xml2js(data_1[0].res_info);
                resolve(jsonData);
              } else {
                this.globalData.showAlert('Alert!!!', JSON.stringify(data_1));
              }
            },
            (err) => {
              this.globalData.showAlert('Alert!!!', JSON.stringify(err));
            },
            this._pidOptionsXML
          );
        }
      } catch (err_1) {
        this.sqlite.addAuditTrail(
          moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          'L1_RD_Service',
          'L1_RD_Service',
          JSON.stringify(err_1)
        );
      }
    });
  }

  /**
   * @method _getGetPidOptionsXML
   * @description Function helps to generate PID Option XML Data request for fingerPrint Scaning Device to get PID data from the device.
   * @author HariHaraSuddhan S
   */
  private getGetPidOptionsXML(deviceName: any) {
    // let _self = this;
    return new Promise((resolve, reject) => {
      deviceName.vGetPidOptionXML(
        (pid) => {
          capturexml = pid[0].res_info;
          resolve(capturexml);
        },
        (err) => {
          this.globalData.showAlert('Alert!!!', JSON.stringify(err));
          reject(null);
        },
        this._timeout,
        this._pidVersion,
        this.format,
        this._fType,
        this._fCoutn,
        this._environment,
        this._demotag,
        this._bluetoothConnection,
        this._btName,
        this._dmac,
        this._wadh,
        this._otp,
        this._iCount,
        this._iType
      );
    }).catch((err) => {
      this.sqlite.addAuditTrail(
        moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        'getGetPidOptionsXML',
        'getGetPidOptionsXML',
        JSON.stringify(err)
      );
    });
  }
}
