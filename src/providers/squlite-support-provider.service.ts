  import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { BehaviorSubject } from 'rxjs'
import { HttpClient} from '@angular/common/http';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import * as moment from 'moment';
import { GlobalService } from './global.service';
import { SqliteService } from './sqlite.service';
import { DataPassingProviderService } from './data-passing-provider.service';


// import { SqliteProvider } from "../sqlite/sqlite";
// import { DataPassingProvider } from "../data-passing/data-passing";
// import { GlobalfunctionsProvider } from '../globalfunctions/globalfunctions';


@Injectable({
  providedIn: 'root'
})
export class SquliteSupportProviderService {
    database: SQLiteObject;
    dateTime = new Date();
  
    constructor(
      public sqlitePorter: SQLitePorter,
      public sqliteProvider: SqliteService,
      public globalFunction: DataPassingProviderService,
      public device: Device,
      private globFunc: GlobalService
    ) {
      this.sqliteProvider.getDatabaseState().subscribe(ready => {
        if (ready) {
          this.loadInit();
          console.log("SQL Object =>" + this.globalFunction._sqlObj);
        }
      })
    }
  
    loadInit() {
      this.database = this.globalFunction._sqlObj;
    }
    getAll(result) {
      var output = [];
      for (var i = 0; i < result.rows.length; i++) {
        output.push(result.rows.item(i));
      }
      return output;
    }
    InsertCASADetails(refId, id, usertype, value, casaId, casaStage?) {
      if (casaId == "" || casaId == undefined || casaId == null) {
        let data = [refId, id, usertype, value.janaAcc, value.nomAvail, value.guaAvail, value.nomList, casaStage];
        return this.database.executeSql("INSERT INTO CASA_DETAILS(refId, id, usertype,janaAcc, nomAvail, guaAvail, nomList,casaStage) values (?,?,?,?,?,?,?,?)", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertCASADetails", "Insert Failure", JSON.stringify(err));
          return [];
        });
      } else {
        let data = [value.janaAcc, value.nomAvail, value.guaAvail, value.nomList, casaId];
        return this.database.executeSql("UPDATE CASA_DETAILS SET janaAcc=?,nomAvail=?, guaAvail=?, nomList=? WHERE casaId=?", data).then((data) => {
          return data;
        }, err => {
          console.log("err: " + JSON.stringify(err));
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertCASADetails", "Update Failure", JSON.stringify(err));
          return err;
        });
      }
    }
  
    updateCasaOnPS(refId, id){
      let data = [refId, id];
      return this.database.executeSql("UPDATE CASA_DETAILS SET janaAcc='Y',editedInPS='Y',nomAvail='Y',editCasaSaved=2,casaStage='2' WHERE refId=? AND id=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "UpdateCASADetails", "Update Failure", JSON.stringify(err));
        return err;
      });
    }
  
    updateCasaNoinPS(refId, id){
      let data = [refId, id];
      return this.database.executeSql("UPDATE CASA_DETAILS SET janaAcc='N',editedInPS='N',nomAvail='N' WHERE refId=? AND id=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "UpdateCASADetails", "Update Failure", JSON.stringify(err));
        return err;
      });
    }
  
    getCASADetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM CASA_DETAILS WHERE refId=? and id=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getCASADetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
    InsertNomineeDetails(refId, id, usertype, leadId, value, nomId) {
      if (nomId == "" || nomId == undefined || nomId == null) {
        let data = [refId, id, usertype, leadId, value.nomTitle, value.nominame, value.nomdob, value.nomiage, value.nomrelation, value.nomi_address1, value.nomi_address2, value.nomi_address3, value.nomicities, value.nomistates, value.nomipincode, value.nomicountries, value.nomiCNum, value.guaTitle, value.guaname, value.guarelation, value.guaCNum, value.gua_address1, value.gua_address2, value.guacities, value.guastates, value.guapincode, value.guacountries];
        return this.database.executeSql("INSERT INTO NOMINEE_DETAILS(refId, id, usertype, leadId, nomTitle, nominame, nomdob, nomiage, nomrelation, nomi_address1, nomi_address2, nomi_address3, nomicities, nomistates, nomipincode, nomicountries, nomiCNum, guaTitle, guaname, guarelation, guaCNum, gua_address1, gua_address2, guacities, guastates, guapincode, guacountries) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertNomineeDetails", "Insert Failure", JSON.stringify(err));
          return [];
        });
      } else {
        let data = [leadId, value.nomTitle, value.nominame, value.nomdob, value.nomiage, value.nomrelation, value.nomi_address1, value.nomi_address2, value.nomi_address3, value.nomicities, value.nomistates, value.nomipincode, value.nomicountries, value.nomiCNum, value.guaTitle, value.guaname, value.guarelation, value.guaCNum, value.gua_address1, value.gua_address2, value.guacities, value.guastates, value.guapincode, value.guacountries, nomId];
        return this.database.executeSql("UPDATE NOMINEE_DETAILS SET leadId=?, nomTitle=?, nominame=?, nomdob=?, nomiage=?, nomrelation=?, nomi_address1=?, nomi_address2=?, nomi_address3=?, nomicities=?, nomistates=?, nomipincode=?, nomicountries=?, nomiCNum=?, guaTitle=?, guaname=?, guarelation=?, guaCNum=?, gua_address1=?, gua_address2=?, guacities=?, guastates=?, guapincode=?, guacountries=? WHERE nomId=?", data).then((data) => {
          return data;
        }, err => {
          console.log("err: " + JSON.stringify(err));
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertNomineeDetails", "Update Failure", JSON.stringify(err));
          return err;
        });
      }
    }
    getNomineeDetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM NOMINEE_DETAILS WHERE refId=? and id=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getNomineeDetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
    removeNomineeDetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("DELETE FROM NOMINEE_DETAILS WHERE refId=? and id=?", data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeNomineeDetails", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
    InsertIMDDetails(refId, id, userType, value, imdId) {
      if (imdId == "" || imdId == null || imdId == undefined) {
        let data = [value.imdPayType, value.imdInstrument, value.imdACName, value.imdACNumber, value.imdAmount, JSON.stringify(value.imdBName), value.imdIFSC, value.imdDate, userType, id, refId]
        return this.database.executeSql("INSERT INTO IMD_DETAILS(imdPayType, imdInstrument, imdACName, imdACNumber, imdAmount, imdBName, imdIFSC, imdDate, userType, id, refId) VALUES (?,?,?,?,?,?,?,?,?,?,?)", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertIMDDetails", "Insert Failure", JSON.stringify(err));
          return err;
        });
      }
      else {
        let data = [value.imdPayType, value.imdInstrument, value.imdACName, value.imdACNumber, value.imdAmount, JSON.stringify(value.imdBName), value.imdIFSC, value.imdDate, imdId]
        return this.database.executeSql("UPDATE IMD_DETAILS SET imdPayType=?, imdInstrument=?, imdACName=?, imdACNumber=?, imdAmount=?, imdBName=?, imdIFSC=?, imdDate=? WHERE imdId=?", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertIMDDetails", "Update Failure", JSON.stringify(err));
          return err;
        });
      }
    }
    getImdDetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM IMD_DETAILS WHERE refId=? AND id=?", data).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getImdDetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
    InsertServiceDetails(refId, id, userType, value, serId) {
      if (serId == "" || serId == null || serId == undefined) {
        let data = [value.acType, value.modeofoper, value.operaInst, value.authSign, userType, id, refId];
        return this.database.executeSql("INSERT INTO SERVICE_DETAILS(acType, modeofoper, operaInst, authSign, userType, id, refId) VALUES (?,?,?,?,?,?,?)", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertServiceDetails", "Insert Failure", JSON.stringify(err));
          return err;
        });
      }
      else {
        let data = [value.acType, value.modeofoper, value.operaInst, value.authSign, serId]
        console.log(JSON.stringify(data));
        return this.database.executeSql("UPDATE SERVICE_DETAILS SET acType=?, modeofoper=?, operaInst=?, authSign=? WHERE serId=?", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertServiceDetails", "Update Failure", JSON.stringify(err));
          return err;
        });
      }
    }
    getServDetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM SERVICE_DETAILS WHERE refId=? AND id=?", data).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getServDetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
    getPrimaryApplicantName(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM ORIG_PERSONAL_DETAILS WHERE refId=? AND id=? AND userType='A'", data).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getPrimaryApplicantName", "Retrieve Failure", JSON.stringify(err));
        return [];
      })
    }
    addSignImages(refId, id, imgpath, serId) {
      let data = [refId, id, imgpath, serId];
      return this.database.executeSql("INSERT INTO ORIG_SIGN_IMGS (refId,id,imgpath,serId) VALUES (?,?,?,?)", data).then(data => {
        return data;
      }, err => {
        console.log(err)
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addSignImages", "Insert Failure", JSON.stringify(err));
      })
    }
    getSignImages(serId) {
      return this.database.executeSql("SELECT * FROM ORIG_SIGN_IMGS WHERE serId=?", [serId]).then((data) => {
        let details = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            details.push({
              imgpath: data.rows.item(i).imgpath,
              id: data.rows.item(i).proofImgId
            });
          }
        }
        return details;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getSignImages", "Retrieve Failure", JSON.stringify(err));
        return err;
      })
    }
    removeSignImages(id) {
      return this.database.executeSql("DELETE FROM ORIG_SIGN_IMGS WHERE serId=?", [id]).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeSignImages", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
    addAnnexure(refId, id, imgpath, serId) {
      let data = [refId, id, imgpath, serId];
      return this.database.executeSql("INSERT INTO ORIG_ANNEXURE_IMGS (refId,id,imgpath,serId) VALUES (?,?,?,?)", data).then(data => {
        return data;
      }, err => {
        console.log(err)
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addAnnexure", "Insert Failure", JSON.stringify(err));
      })
    }
    getAnnexure(serId) {
      return this.database.executeSql("SELECT * FROM ORIG_ANNEXURE_IMGS WHERE serId=?", [serId]).then((data) => {
        let details = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            details.push({
              imgpath: data.rows.item(i).imgpath,
              id: data.rows.item(i).proofImgId
            });
          }
        }
        return details;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getAnnexure", "Retrieve Failure", JSON.stringify(err));
        return err;
      })
    }
    removeAnnexure(id) {
      return this.database.executeSql("DELETE FROM ORIG_ANNEXURE_IMGS WHERE serId=?", [id]).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeAnnexure", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
    addImdImages(refId, id, imgpath, imdId) {
      let data = [refId, id, imgpath, imdId];
      return this.database.executeSql("INSERT INTO ORIG_IMD_IMGS (refId,id,imgpath,imdId) VALUES (?,?,?,?)", data).then(data => {
        return data;
      }, err => {
        console.log(err)
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addImdImages", "Insert Failure", JSON.stringify(err));
      })
    }
    getImdImages(imdId) {
      return this.database.executeSql("SELECT * FROM ORIG_IMD_IMGS WHERE imdId=?", [imdId]).then((data) => {
        let details = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            details.push({
              imgpath: data.rows.item(i).imgpath,
              id: data.rows.item(i).proofImgId
            });
          }
        }
        return details;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getImdImages", "Retrieve Failure", JSON.stringify(err));
        return err;
      })
    }
    removeImdImages(id) {
      return this.database.executeSql("DELETE FROM ORIG_IMD_IMGS WHERE imdId=?", [id]).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeImdImages", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
    getImdImagesSubmit(imdId) {
      return this.database.executeSql("SELECT * FROM ORIG_IMD_IMGS WHERE imdId=?", [imdId]).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getImdImagesSubmit", "Retrieve Failure", JSON.stringify(err));
        return err;
      })
    }
    getPermanentAppDetails(refId) {
      let data = [refId];
      return this.database.executeSql("SELECT * FROM ORIG_PERMANENT_ADDRESS_DETAILS WHERE refId=?", data).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getPermanentAppDetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      })
    }
    deleteApplicantDetails(refId) {
      let data = [refId];
      return this.database.executeSql("DELETE FROM ORIG_APP_DETAILS where id=?", data),
        this.database.executeSql("DELETE FROM ORIG_BASIC_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PERSONAL_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_ENTITY_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_RESIDENT_ADDRESS_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_BUSINESS_ADDRESS_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_ENTITY_ADDRESS_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PERMANENT_ADDRESS_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PROOF_PROMOTER_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PROOF_ENTITY_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_ENTITY_PROOF_IMGS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PROMOTER_PROOF_IMGS where refId=?", data),
        this.database.executeSql("DELETE FROM SUBMIT_STATUS where refId=?", data).then(data => {
          return data;
        }, err => {
          console.log(err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "deleteApplicantDetails", "Delete Failure", JSON.stringify(err));
          return err;
        });
    }
    getNomList(refId, userType) {
      let data = [refId, userType];
      return this.database.executeSql("SELECT * FROM ORIG_PERSONAL_DETAILS WHERE refId=? and userType=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getNomList", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
    InsertNachDetails(refId, id, userType, value, nachId) {
      if (nachId == "" || nachId == null || nachId == undefined) {
        let data = [value.nachImdSame, JSON.stringify(value.nachBName), value.nachBranName, value.nachACNumber, value.nachIFSC, value.nachAcType, value.nachACName, userType, id, refId]
        return this.database.executeSql("INSERT INTO NACH_DETAILS(nachImdSame, nachBName, nachBranName, nachACNumber, nachIFSC, nachAcType, nachACName, userType, id, refId) VALUES (?,?,?,?,?,?,?,?,?,?)", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertNachDetails", "Insert Failure", JSON.stringify(err));
          return err;
        });
      }
      else {
        let data = [value.nachImdSame, JSON.stringify(value.nachBName), value.nachBranName, value.nachACNumber, value.nachIFSC, value.nachAcType, value.nachACName, nachId]
        return this.database.executeSql("UPDATE NACH_DETAILS SET nachImdSame=?, nachBName=?, nachBranName=?, nachACNumber=?, nachIFSC=?, nachAcType=?, nachACName=? WHERE nachId=?", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertNachDetails", "Update Failure", JSON.stringify(err));
          return err;
        });
      }
    }
    getNachDetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM NACH_DETAILS WHERE refId=? AND id=?", data).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getNachDetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    addPslImages(refId, id, imgPath, pslTableId) {
      let data = [refId, id, imgPath, pslTableId];
      return this.database.executeSql("INSERT INTO PSL_BUSINESS_IMG (refId,id,imgPath,pslTableId) VALUES (?,?,?,?)", data).then(data => {
        return data;
      }, err => {
        console.log(err)
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addPslImages", "Insert Failure", JSON.stringify(err));
      })
    }
  
    getPslImages(pslId) {
      return this.database.executeSql("SELECT * FROM PSL_BUSINESS_IMG WHERE pslTableId=?", [pslId]).then((data) => {
        let details = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            details.push({
              imgpath: data.rows.item(i).imgPath,
              id: data.rows.item(i).proofImgId
            });
          }
        }
        return details;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getPslImages", "Retrieve Failure", JSON.stringify(err));
        return err;
      })
    }
    removePslImages(id) {
      return this.database.executeSql("DELETE FROM PSL_BUSINESS_IMG WHERE pslTableId=?", [id]).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeNachImages", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
  
    addNachImages(refId, id, imgpath, nachId) {
      let data = [refId, id, imgpath, nachId];
      return this.database.executeSql("INSERT INTO NACH_IMGS (refId,id,imgpath,nachId) VALUES (?,?,?,?)", data).then(data => {
        return data;
      }, err => {
        console.log(err)
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addNachImages", "Insert Failure", JSON.stringify(err));
      })
    }
  
  
    getNachImages(nachId) {
      return this.database.executeSql("SELECT * FROM NACH_IMGS WHERE nachId=?", [nachId]).then((data) => {
        let details = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            details.push({
              imgpath: data.rows.item(i).imgpath,
              id: data.rows.item(i).proofImgId
            });
          }
        }
        return details;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getNachImages", "Retrieve Failure", JSON.stringify(err));
        return err;
      })
    }
    removeNachImages(id) {
      return this.database.executeSql("DELETE FROM NACH_IMGS WHERE nachId=?", [id]).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeNachImages", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
    addNachStateImages(refId, id, imgpath, nachId) {
      let data = [refId, id, imgpath, nachId];
      return this.database.executeSql("INSERT INTO NACH_STATEMENT_IMGS (refId,id,imgpath,nachId) VALUES (?,?,?,?)", data).then(data => {
        return data;
      }, err => {
        console.log(err)
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addNachStateImages", "Insert Failure", JSON.stringify(err));
      })
    }
    getNachStateImages(nachId) {
      return this.database.executeSql("SELECT * FROM NACH_STATEMENT_IMGS WHERE nachId=?", [nachId]).then((data) => {
        let details = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            details.push({
              imgpath: data.rows.item(i).imgpath,
              id: data.rows.item(i).proofImgId
            });
          }
        }
        return details;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getNachStateImages", "Retrieve Failure", JSON.stringify(err));
        return err;
      })
    }
    removeNachStateImages(id) {
      return this.database.executeSql("DELETE FROM NACH_STATEMENT_IMGS WHERE nachId=?", [id]).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeNachStateImages", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
    addAuditTrail(Timestamp, service, action, value) {
      let data = [this.globFunc.basicDec(localStorage.getItem('username')), this.device.uuid, Timestamp, service, action, value];
      return this.database.executeSql("INSERT INTO AUDIT_LOG(username,deviceID,Timestamp,service,action,value) VALUES (?,?,?,?,?,?)", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addAuditTrail", "Insert Failure", JSON.stringify(err));
        console.log("err: " + err);
        return err;
      })
    }
  
    insertEKYCDetails(leadId, janaid, EkycPersonal, Ekycaddress,aepsStatus) {
      let data = [leadId, janaid, JSON.stringify(EkycPersonal), JSON.stringify(Ekycaddress),aepsStatus];
      return this.database.executeSql("INSERT INTO EKYC_RESPONSE(leadId, janaid, EkycPersonal, Ekycaddress,aespFlag) VALUES (?,?,?,?,?)", data).then((data) => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertEKYCDetails", "Insert Success", JSON.stringify(data));
        return data;
      }, err => {
        console.log("root err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertEKYCDetails", "Insert Failure", JSON.stringify(err));
        return err;
      })
    }
    
    updateSubmitCASADetails(CASA, statId) {
      let data = [CASA, statId];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET CASA=? WHERE statId=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateSubmitCASADetails", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateSubmitVehicleSubmitDetails(vehicleSubmit, statId) {
      let data = [vehicleSubmit, statId];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET vehicleSub=? WHERE statId=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateSubmitVehicleSubmitDetails", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateNACHSubmitDetails(NACH, appNo) {
      let data = [NACH, appNo];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET NACH=? WHERE applicationNumber=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateNACHSubmitDetails", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateAutoApproval(statId) {
      let data = [statId];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET autoApproval='1' WHERE statId=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateAutoApproval", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updatePostSanction(statId) {
      let data = [statId];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET postSanction='1' WHERE statId=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSanction", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateCreditCheck(statId) {
      let data = [statId];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET creditCheck='1' WHERE statId=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateCreditCheck", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    getFlowPoint(flowPoint) {
      let data = [flowPoint];
      return this.database.executeSql("SELECT * FROM VEHICLEWORKFLOW WHERE flowPoint=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getFlowPoint", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    getGroupIdBasedOnUser(userId) {
      let data = [userId];
      return this.database.executeSql("SELECT * FROM LOGIN_DETAILS WHERE userID=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getGroupIdBasedOnUser", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
    getRequiredScoreBasedOnPrd(prdCode) {
      let data = [prdCode];
      return this.database.executeSql("SELECT * FROM PRODUCT_MASTER WHERE prdCode=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getRequiredScoreBasedOnPrd", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    updateWorkFlowStatus(appNo) {
      let data = [appNo];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET workFlowStatus='N',creditCheck='1',creditEligibility='notEligible' WHERE applicationNumber=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateWorkFlowStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updateEligibilityStatus(status, statId) {
      let data = [status, statId];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET creditEligibility=? WHERE statId=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateEligibilityStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    gLeadAppDetailsInsertUpdate(groupData, deviceId) {
      console.log("Group Data", groupData);
      let data = [groupData.AppCreationdt, deviceId, this.globFunc.basicDec(localStorage.getItem('username')), groupData.ApplicantDetails[0].leadId]
      return this.database.executeSql("INSERT INTO ORIG_APP_DETAILS(createdDate, deviceId, createdUser, appUniqueId) VALUES (?,?,?,?)", data).then((data) => {
        return data;
      }, err => {
        console.log("root err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "gLeadAppDetailsInsertUpdate", "Insert Failure", JSON.stringify(err));
        return err;
      })
    }
   gaddVehicleDetails(refId, id, value) {
    const data = [refId, id, value.Model, value.Variant, value.Downpayment, value.Brand, value.OnRoadPrice, value.DealerCode, value.CC, value.UsedRcno, value.UsedChassisno, value.UsedEngineno, value.UsedYrsofmanufacture, value.UsedRegistrationdate, value.UsedVehicleAge, value.UsedHypothecationstatus, value.UsedNumberofowner, value.UsedKmdriven, value.UsedDealerquotation, value.UsedOBV, value.UsedFinalassetprice, value.UsedAssetageatmaturity,value.LSOFlag];
    return this.database.executeSql("INSERT INTO VEHICLE_DETAILS(refId,id,model,variant,downpayment,brandName,onroadPrice,dealerName,cc,rcNo,engineNo,chassisNo,yearOfMan,registrationDate,vehicleAge,hypothecation,noofOwner,kmDriven,dealerQuotation,obv,assetPrice,assetAge,lsoFlag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", data).then(data => data).catch(err => {
      console.log('Error: ', err);
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "gaddVehicleDetails", "Insert Failure", JSON.stringify(err));
      return [];
    })
  }
    gLeadBasicDetails(refId, lead, loanAmountFrom, loanAmountTo, guaFlag, userType, productType, profPic, lmsLeadId) {
      let data = [refId, lead.LoanDetails.prdMainCat, lead.prd_code, lead.LoanDetails.LoanAmnt, lead.LoanDetails.Tenor, lead.LoanDetails.IntType, lead.LoanDetails.IntRate, lead.LoanDetails.LoanPurpose, lead.LoanDetails.Installments, lead.LoanDetails.Refinance, lead.LoanDetails.HolidayPeriod, lead.LoanDetails.ModeofPayment, "", lead.LoanDetails.AdvInstallment, lead.LoanDetails.Vehicletype, lead.LoanDetails.ElectricVehicle, lead.LoanDetails.MarginMoney, lead.LoanDetails.ProcessingFee, lead.LoanDetails.SegmentType, lead.LoanDetails.StampDuty, lead.LoanDetails.NachCharges, lead.LoanDetails.PddCharges, lead.LoanDetails.DocCharges, lead.LoanDetails.BorrhealthIns, (lead.LoanDetails.CoborrhealthIns) ? lead.LoanDetails.CoborrhealthIns : "", lead.LoanDetails.Insurancepremium, '0', (lead.LoanDetails.AdvanceEmiAmt) ? lead.LoanDetails.AdvanceEmiAmt : "", lead.LoanDetails.GstPf, lead.LoanDetails.GstSdc, lead.LoanDetails.GstNach, lead.LoanDetails.GstPdd, lead.LoanDetails.GstotherCharges, lead.LoanDetails.EmiAmt, lead.LoanDetails.Emimode, "", lead.LoanDetails.Totaldownpay, lead.LoanDetails.DBAmount, lead.DealerId, "", loanAmountFrom, loanAmountTo, guaFlag, userType, productType, profPic, lmsLeadId, lead.LoanDetails.PreEmiDB, lead.LoanDetails.DBdate, lead.LoanDetails.TotalLoanAmt];
      return this.database.executeSql("INSERT INTO ORIG_BASIC_DETAILS(refId, prdSche, janaLoan, loanAmount, tenure, interest, intRate, purpose, installment, refinance, holiday, repayMode, pmay,advavceInst, vehicleType, electricVehicle, margin, processingFee, segmentType, stampDuty, nachCharges, pddCharges, otherCharges, borHealthIns,coBorHealthIns, insPremium, preEmi, advanceEmi, gstonPf, gstonSdc, gstonNach, gstonPddCharges, gstonOtherCharges, emi, emiMode, downpayment,totalDownPay, dbAmount, dealerName, dealerCode, loanAmountFrom, loanAmountTo, guaFlag, userType, productType, profPic, lmsLeadId,preEmiDB,dbDate,totalloanAmount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "gLeadBasicDetails", "Insert Failure", JSON.stringify(err));
        return err;
      })
  
    }
  
    updateFromGroupInbox(appNo, workflowStatus) {
      let data = [workflowStatus, appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET fromGroupInbox='Y',workFlowStatus=? WHERE applicationNumber=? and createdUser=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateFromGroupInbox", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updateCreditCheckStatus(appNo, status) {
      let data = [status, appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET creditEligibility='eligible',creditCheck=? WHERE applicationNumber=? and createdUser=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateCreditCheckStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    insertPosidex(refId, id, cbs, type) {
      let data = [refId, id, cbs, type]
      return this.database.executeSql("INSERT INTO POSIDEXCHECK(refId, id, cbsStatus, userType) VALUES (?,?,?,?)", data).then((data) => {
        return data;
      }, err => {
        console.log("root err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertPosidex", "Insert Failure", JSON.stringify(err));
        return err;
      })
    }
  
    getBasicDetailsUserType(refId, type) {
      let data = [refId, type];
      return this.database.executeSql("SELECT * FROM ORIG_BASIC_DETAILS WHERE refId=? AND userType=?", data).then((data) => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "ORIG_BASIC_DETAILS", "Retrieve Success", JSON.stringify(data));
        return this.getAll(data);
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "ORIG_BASIC_DETAILS", "Retrieve Failure", JSON.stringify(err));
        console.log('Error: ', JSON.stringify(err));
        return [];
      })
    }
  
    updateFieldInvestigationStatus(appNo, status) {
      let data = [status, appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET fieldInvestigation=? WHERE applicationNumber=? and createdUser=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateFieldInvestigationStatus", "Update Failure", JSON.stringify(err));
        return err;
      });
    }
  
    updateManualApproval(appNo, status) {
      let data = [status, appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET underManual=? WHERE applicationNumber=? and createdUser=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateManualApproval", "Update Failure", JSON.stringify(err));
        return err;
      });
    }
    updateForPostSanction(appNo, status, underManual) {
      let data = [status, underManual, appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET postSanction=?,underManual=? WHERE applicationNumber=? and createdUser=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateForPostSanction", "Update Failure", JSON.stringify(err));
        return err;
      });
    }
  
    // insertPostSanctionDetails(refId, id, value, applicationNumber, modfiedFlag, segmentFlag, valuesModified, scoreCardRerun, psmSubmitted, postSanId) {
    //   if (postSanId) {
    //     let data = [refId, id, applicationNumber, value.loanAmount, value.tenure, value.brandName, value.model, value.variant,
    //       value.downpayment, value.marginCost, value.segment, value.dbDate, value.preEmiDB, value.totalloanAmount, modfiedFlag, segmentFlag,
    //       valuesModified, scoreCardRerun, psmSubmitted, value.dealerName, value.cc, value.rcNo, value.engineNo, value.chassisNo,
    //       value.yearOfMan, value.registrationDate, value.vehicleAge, value.hypothecation, value.noofOwner, value.kmDriven, value.dealerQuotation,
    //       value.obv, value.assetPrice, value.assetAge,,value.vehicleCatogery,value.nameAsPerRC,value.apiFlag,postSanId];
    //     return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET refId=?, id=?,applicationNumber=?,loanAmount=?,tenure=?,brandName=?,model=?,variant=?,downpayment=?,marginCost=?,segment=?,dbDate=?,preEmiDB=?,totalloanAmount=?,modified=?,segmentFlag=?,valuesModified=?,scoreCardRerun=?,psmSubmitted=?,dealerName=?,cc=?,rcNo=?,engineNo=?,chassisNo=?,yearOfMan=?,registrationDate=?,vehicleAge=?,hypothecation=?,noofOwner=?,kmDriven=?,dealerQuotation=?,obv=?,assetPrice=?,assetAge=?,vehicleCatogery=?,nameAsPerRC=?,apiFlag=? WHERE postSanId=?", data).then((data) => {
    //       return data;
    //     }, err => {
    //       console.log("err: " + JSON.stringify(err));
    //       this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertPostSanctionDetails", "Update Failure", JSON.stringify(err));
    //       return err;
    //     });
    //   } else {
    //     let data = [refId, id, applicationNumber, value.loanAmount, value.tenure, value.brandName, value.model, value.variant,
    //       value.downpayment, value.marginCost, value.segment, value.dbDate, value.preEmiDB, value.totalloanAmount, modfiedFlag, segmentFlag,
    //       valuesModified, scoreCardRerun, psmSubmitted, value.dealerName, value.cc, value.rcNo, value.engineNo, value.chassisNo,
    //       value.yearOfMan, value.registrationDate, value.vehicleAge, value.hypothecation, value.noofOwner, value.kmDriven, value.dealerQuotation,
    //       value.obv, value.assetPrice, value.assetAge,value.vehicleCatogery,value.nameAsPerRC,value.apiFlag];
    //     return this.database.executeSql("INSERT INTO ORIG_POST_SANCTION (refId,id,applicationNumber,loanAmount,tenure,brandName,model,variant,downpayment,marginCost,segment,dbDate,preEmiDB,totalloanAmount,modified,segmentFlag,valuesModified,scoreCardRerun,psmSubmitted,dealerName,cc,rcNo,engineNo,chassisNo,yearOfMan,registrationDate,vehicleAge,hypothecation,noofOwner,kmDriven,dealerQuotation,obv,assetPrice,assetAge,vehicleCatogery,nameAsPerRC,apiFlag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", data).then(data => {
    //       return data;
    //     }, err => {
    //       console.log(err)
    //       this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertPostSanctionDetails", "Insert Failure", JSON.stringify(err));
    //     })
    //   }
    // }
  
    convertToString(value: [string]) {
      return Array.isArray(value) ? value.toString() : value;
    }

    insertPostSanctionDetails(refId, id, value, applicationNumber, modfiedFlag, segmentFlag, valuesModified, scoreCardRerun, psmSubmitted, postSanId) {
      let brandName = this.convertToString(value.brandName);
      if (postSanId) {
        let data = [refId, id, applicationNumber, value.loanAmount, value.tenure, brandName, value.model, value.variant,
          value.downpayment, value.marginCost, value.segment, value.dbDate, value.preEmiDB, value.totalloanAmount, modfiedFlag, segmentFlag,
          valuesModified, scoreCardRerun, psmSubmitted, value.dealerName, value.cc, value.rcNo, value.engineNo, value.chassisNo,
          value.yearOfMan, value.registrationDate, value.vehicleAge, value.hypothecation, value.noofOwner, value.kmDriven, value.dealerQuotation,
          value.obv, value.assetPrice, value.assetAge,value.vehicleCatogery,value.nameAsPerRC,value.apiFlag,postSanId];
        return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET refId=?, id=?,applicationNumber=?,loanAmount=?,tenure=?,brandName=?,model=?,variant=?,downpayment=?,marginCost=?,segment=?,dbDate=?,preEmiDB=?,totalloanAmount=?,modified=?,segmentFlag=?,valuesModified=?,scoreCardRerun=?,psmSubmitted=?,dealerName=?,cc=?,rcNo=?,engineNo=?,chassisNo=?,yearOfMan=?,registrationDate=?,vehicleAge=?,hypothecation=?,noofOwner=?,kmDriven=?,dealerQuotation=?,obv=?,assetPrice=?,assetAge=?,vehicleCatogery=?,nameAsPerRC=?,apiFlag=? WHERE postSanId=?", data).then((data) => {
          return data;
        }, err => {
          console.log("err: " + JSON.stringify(err));
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertPostSanctionDetails", "Update Failure", JSON.stringify(err));
          return err;
        });
      } else {
        let data = [refId, id, applicationNumber, value.loanAmount, value.tenure, brandName, value.model, value.variant,
          value.downpayment, value.marginCost, value.segment, value.dbDate, value.preEmiDB, value.totalloanAmount, modfiedFlag, segmentFlag,
          valuesModified, scoreCardRerun, psmSubmitted, value.dealerName, value.cc, value.rcNo, value.engineNo, value.chassisNo,
          value.yearOfMan, value.registrationDate, value.vehicleAge, value.hypothecation, value.noofOwner, value.kmDriven, value.dealerQuotation,
          value.obv, value.assetPrice, value.assetAge,value.vehicleCatogery,value.nameAsPerRC,value.apiFlag];
        return this.database.executeSql("INSERT INTO ORIG_POST_SANCTION (refId,id,applicationNumber,loanAmount,tenure,brandName,model,variant,downpayment,marginCost,segment,dbDate,preEmiDB,totalloanAmount,modified,segmentFlag,valuesModified,scoreCardRerun,psmSubmitted,dealerName,cc,rcNo,engineNo,chassisNo,yearOfMan,registrationDate,vehicleAge,hypothecation,noofOwner,kmDriven,dealerQuotation,obv,assetPrice,assetAge,vehicleCatogery,nameAsPerRC,apiFlag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", data).then(data => {
          return data;
        }, err => {
          console.log(err)
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertPostSanctionDetails", "Insert Failure", JSON.stringify(err));
        })
      }
    }
    
    getPostSanctionDetails(refId, id) {
      let data = [refId, id];
      // return this.database.executeSql("SELECT * FROM ORIG_POST_SANCTION a LEFT OUTER JOIN SUBMIT_STATUS b ON (b.id=a.id) WHERE a.refId=? and a.id=?", data).then(data => {
      return this.database.executeSql("SELECT * FROM ORIG_POST_SANCTION WHERE refId=? and id=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getPostSanctionDetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
    getFirstKycDetails(leadId) {
      let data = [leadId];
      return this.database.executeSql("SELECT * FROM KARZA_DATA a LEFT OUTER JOIN EKYC_RESPONSE b ON (b.leadId=a.leadId) WHERE a.leadId=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getFirstKycDetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    updatePostSanctionDocument(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET postSancDocUpload='Y' WHERE refId=? and id=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSanctionDocument", "Update Failure", JSON.stringify(err));
        return [];
      });
    }
  
    getPosidexData(refId) {
      let data = [refId];
      return this.database.executeSql("SELECT * FROM POSIDEXCHECK WHERE refId=?", data).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getPosidexData", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    updateDisbursement(appNo) {
      let data = [appNo];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET disbursementCheck='Y' WHERE applicationNumber=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateDisbursement", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateCBSstatus(refId, id, value, PropNo, cbsTableflag, cbsStatus) {
      let data = [value, PropNo, refId, id];
      return this.database.executeSql(`UPDATE CBS_CREATION SET ${cbsStatus}='Y',${cbsTableflag}=? WHERE applicationNumber=? and refId=? and id=?`, data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateCBSstatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
  
    insertCBSstatus(refId, id, cbsCustId, cbsAccountNumber, PropNo, cbsCustomerEnable, cbsAccountEnable, instaKitEnable, cbsButtonEnable) {
      let data = [refId, id, cbsCustId, cbsAccountNumber, PropNo, "Y", cbsCustomerEnable ? 'Y' : 'N', cbsAccountEnable ? 'Y' : 'N', instaKitEnable ? 'Y' : 'N', cbsButtonEnable ? 'Y' : 'N'];
      return this.database.executeSql("INSERT INTO CBS_CREATION(refId, id, customerId,accountNo, applicationNumber,cbsButtonEnable, cbsCustomerEnable,cbsAccountEnable,cbsInstakitEnable, cbsButtonEnable) values (?,?,?,?,?,?,?,?,?,?)", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertCBSstatus", "insertCBSstatus Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
  
    getCBSDetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM CBS_CREATION WHERE refId=? and id=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getCASADetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    updateUndoProposal(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET undoProposal='Y' WHERE refId=? AND id=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateUndoProposal", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updatePostSanctionAfterRerun(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET scoreCardRerun='N' WHERE refId=? AND id=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateUndoProposal", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updatePostSanctionStatus(appNo) {
      let data = [appNo];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET postSancModified='Y' WHERE applicationNumber=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSanctionStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updateEligibleAmout(eligibleAmt, appNo) {
      let data = [eligibleAmt, appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET eligibleAmt=? WHERE applicationNumber=? and createdUser=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateEligibleAmout", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updateSanctionedAmount(sanctionAmt, emi, appNo) {
      let data = [sanctionAmt, emi, appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET sanctionedAmt=?,emi=? WHERE applicationNumber=? and createdUser=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateSanctionedAmount", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updatePostSanctionRerunFlags(AutoApprovalFlag, FIFLAG, psmState, refId, id, STPFLAG, SRFLAG, NTCFLAG, FIENTRY) {
      let data = [AutoApprovalFlag, FIFLAG, psmState, STPFLAG, SRFLAG, NTCFLAG, FIFLAG, FIENTRY, refId, id];
      return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET autoApprovalFlag=?,FieldInvFlag=?,psmFlowState=?,STPFLAG=?, SRFLAG=?, NTCFLAG=?,FIFLAG=?, FIENTRY=? WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSanctionRerunFlags", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updatePostSanctionState(flowState, flowStatus, refId, id) {
      let data = [flowState, flowStatus, refId, id];
      return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET psmFlowState=?,flowStatus=? WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSanctionState", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updatePostSanctionManualApprovalFlag(ManualApprovalFlag, refId, id) {
      let data = [ManualApprovalFlag, refId, id];
      return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET ManualApprovalFlag=? WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSanctionManualApprovalFlag", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    deletePSMDetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("DELETE FROM ORIG_POST_SANCTION WHERE refId=? and id=?", data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "deletePSMDetails", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
  
    updateScorecardRerunStatus(columnName, refId, id) {
      let data = [refId, id];
      return this.database.executeSql(`UPDATE ORIG_POST_SANCTION SET ${columnName}='Y' WHERE refId=? and id=?`, data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateScorecardRerunStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    // updateCibilBasicDetails(refId,id,userType,value) {
    //   let data = [value.margin,value.processingFee,value.gstonPf,value.stampDuty,value.gstonSdc,value.nachCharges,value.gstonNach,value.pddCharges,value.gstonPddCharges,value.otherCharges,value.gstonOtherCharges,value.borHealthIns,value.coBorHealthIns,value.insPremium,value.preEmi,value.advanceEmi,value.segmentType,value.emi,value.emiMode,value.totalDownPay,value.dbAmount,refId, id, userType];
    //   return this.database.executeSql("UPDATE ORIG_BASIC_DETAILS SET margin=?,processingFee=?,gstonPf=?,stampDuty=?,gstonSdc=?,nachCharges=?,gstonNach=?,pddCharges=?,gstonPddCharges=?,otherCharges=?,gstonOtherCharges=?,borHealthIns=?,coBorHealthIns=?,insPremium=?,preEmi=?,advanceEmi=?,segmentType=?,emi=?,emiMode=?,totalDownPay=?,dbAmount=? WHERE refId=? and id=? and userType=?", data).then((data) => {
    //     return data;
    //   }, err => {
    //     console.log("err: " + JSON.stringify(err));
    //     this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateBasicDetails", "Update Failure", JSON.stringify(err));
    //     return err;
    //   });
    // }
  
    updateCibilBasicDetails(refId, value, loanAmountFrom, loanAmountTo, userType, id) {
      let processingFee = Math.round(value.processingFee)
      let data = [refId, value.prdSche, value.janaLoan, value.loanAmount, value.tenure, value.interest, parseFloat(value.intRate).toFixed(2), value.purpose, value.installment, value.refinance, value.holiday, value.repayMode, value.pmay || '', value.advavceInst, value.vehicleType, value.electricVehicle, value.margin, processingFee, value.segmentType, value.stampDuty, value.nachCharges, value.pddCharges, value.otherCharges, value.borHealthIns, value.coBorHealthIns, value.insPremium, '0', value.advanceEmi, value.gstonPf, value.gstonSdc, value.gstonNach, value.gstonPddCharges, value.gstonOtherCharges, value.emi, value.emiMode, value.totalDownPay, value.dbAmount, value.dealerName, value.dealerCode || '', loanAmountFrom, loanAmountTo, value.totalloanAmount, value.dbDate, value.preEmiDB, value.insLPI, userType, id]; // guaFlag, productType, profPic, lmsLeadId,
  
      return this.database.executeSql("UPDATE ORIG_BASIC_DETAILS SET refId=?, prdSche=?, janaLoan=?, loanAmount=?, tenure=?, interest=?, intRate=?, purpose=?, installment=?, refinance=?, holiday=?, repayMode=?, pmay=?, advavceInst=?, vehicleType=?, electricVehicle=?, margin=?, processingFee=?, segmentType=?, stampDuty=?, nachCharges=?, pddCharges=?, otherCharges=?, borHealthIns=?, coBorHealthIns=?, insPremium=?, preEmi=?, advanceEmi=?, gstonPf=?, gstonSdc=?, gstonNach=?, gstonPddCharges=?, gstonOtherCharges=?, emi=?, emiMode=?, totalDownPay=?, dbAmount=?, dealerName=?, dealerCode=?, loanAmountFrom=?, loanAmountTo=?, totalloanAmount=?, dbDate=?, preEmiDB=?, insLPI=?, userType=? WHERE id=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateBasicDetails", "Update Failure", JSON.stringify(err));
        return err;
      });
    }
  
    getAfterBasicPromoterProof(refId, id, promoIDType, proofName) {
      let data = [refId, id, promoIDType, proofName];
      return this.database.executeSql("SELECT * FROM ORIG_PROOF_PROMOTER_DETAILS WHERE refId=? AND id=? AND promoIDType=? AND proofName=?", data).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getPromoterProofDetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      })
    }
  
    updateAfterBasicProof(promoIDRef, refId, id, promoIDType, proofName) {
      let udata = [promoIDRef, refId, id, promoIDType, proofName];
      return this.database.executeSql("UPDATE ORIG_PROOF_PROMOTER_DETAILS SET promoIDRef=? where refId=? AND id=? AND promoIDType=? AND proofName=?", udata).then(data => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addPromotersProofDetails", "Update Failure", JSON.stringify(err));
        return err;
      })
    }
  
  
    removeAfterBasicProof(refId, id, promoIDType, proofName) {
      let udata = [refId, id, promoIDType, proofName];
      return this.database.executeSql("DELETE FROM ORIG_PROOF_PROMOTER_DETAILS where refId=? AND id=? AND promoIDType=? AND proofName=?", udata).then(data => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "addPromotersProofDetails", "Update Failure", JSON.stringify(err));
        return err;
      })
    }
  
    updataStatus(columnName, refId, id) {
      let data = [refId, id];
      return this.database.executeSql(`UPDATE ORIG_POST_SANCTION SET ${columnName}='N',psmFlowState='' WHERE refId=? and id=?`, data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateScorecardRerunStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updateSanctionModifiedState(appNo) {
      let data = [appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql(`UPDATE SUBMIT_STATUS SET postSancModified='N' WHERE applicationNumber=? and createdUser=?`, data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateScorecardRerunStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateGroupPostSanction(refId, id, groupInboxFlag) {
      let data = [refId, id];
      return this.database.executeSql(`UPDATE ORIG_POST_SANCTION SET groupInboxFlag='Y' WHERE refId=? AND id=?`, data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateGroupPostSanction", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateGroupCASADetails(janaAcc, refId, id) {
      let data = [janaAcc, refId, id];
      return this.database.executeSql("UPDATE CASA_DETAILS SET janaAcc=? WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateGroupCASADetails", "Update Failure", JSON.stringify(err));
        return err;
      });
  
    }
    updateLoanAmountInPostSanction(sanctionedAmt, refId, id) {
      let data = [sanctionedAmt, refId, id];
      return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET loanAmount=? WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateLoanAmountInPostSanction", "Update Failure", JSON.stringify(err));
        return err;
      });
  
    }
  
    updateCBSAfterCBS(refId, id, PropNo) {
      let data = [PropNo, refId, id];
      return this.database.executeSql(`UPDATE CBS_CREATION SET cbsAccountEnable='N' WHERE applicationNumber=? and refId=? and id=?`, data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateCBSAfterCBS", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updateForPddDoc(PropNo, pddDocFlag) {
      let data = [pddDocFlag, PropNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql(`UPDATE SUBMIT_STATUS SET disbursementCheck='N',postSancDocUpload='Y', enablePDDDoc=? WHERE applicationNumber=? and createdUser=?`, data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateForPddDoc", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    upDateLoanFacilites(value, refId, id) {
      let processingFee = Math.round(value.ProcessingFee)
      let data = [processingFee, value.GstPf, '0', value.MarginMoney, value.DBAmount, value.Totaldownpay, value.dbDate, value.AdvanceEmiAmt, refId, id];
      return this.database.executeSql(`UPDATE ORIG_BASIC_DETAILS SET processingFee=?,gstonPf=?,preEmi=?,margin=?,dbAmount=?,totalDownPay=?,dbDate=?,advanceEmi=? WHERE refId=? and id=?`, data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "upDateLoanFacilites", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateNACHDocSubmitDetails(NACH, appNo) {
      let data = [NACH, appNo];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET nachDoc=? WHERE applicationNumber=?", data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateNACHSubmitDetails", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    insertReferenceDetails(refId, id, usertype, value, detailId) {
      if (detailId == "" || detailId == undefined || detailId == null) {
        let data = [refId, id, value.refName, value.mobileNo, value.refAddress, value.relationship, usertype];
        return this.database.executeSql("INSERT INTO REFERENCE_DETAILS(refId,id,refName,mobileNo,refAddress,relationship,usertype) values (?,?,?,?,?,?,?)", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertReferenceDetails", "Insert Failure", JSON.stringify(err));
          return [];
        });
      } else {
        let data = [value.refName, value.mobileNo, value.refAddress, value.relationship, detailId];
        return this.database.executeSql("UPDATE REFERENCE_DETAILS SET refName=?,mobileNo=?, refAddress=?, relationship=? WHERE detailId=?", data).then((data) => {
          return data;
        }, err => {
          console.log("err: " + JSON.stringify(err));
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateReferenceDetails", "Update Failure", JSON.stringify(err));
          return err;
        });
      }
    }
  
    getreferenceDetails(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM REFERENCE_DETAILS WHERE refId=? and id=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getCASADetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    deleteRefereceDetails(refId, id, detailId) {
      let data = [refId, id, detailId];
      return this.database.executeSql("DELETE FROM REFERENCE_DETAILS WHERE refId=? and id=? and detailId=?", data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "deleteRefereceDetails", "Delete Failure", JSON.stringify(err));
        return err;
      })
    }
  
    // updatePostSanctionTable(appNo, value) {
    //   let data = [value.SanctionAmount, value.tenor, value.Brand, value.Model, value.Variant, value.Downpayment, value.segmentType, appNo];
    //   return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET loanAmount=?,tenure=?,brandName=?,model=?,variant=?,downpayment=?,segment=?,modified='',valuesModified='N',undoProposal='N',scoreCardRerun='N',autoApprovalFlag='N',FieldInvFlag='N',ManualApprovalFlag='N',autoApprovalStatus='N',FieldInvStatus='N',ManualApprovalStatus='N',psmSubmitted='N',psmFlowState='',groupInboxFlag='Y' WHERE applicationNumber=?", data).then((data) => {
    //     return data;
    //   }, err => {
    //     this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSanctionTable", "Update Failure", JSON.stringify(err));
    //     console.log("err: " + JSON.stringify(err));
    //     return err;
    //   });
    // }

    updatePostSanctionTable(appNo, value) {
      let data = [value.SanctionAmount, value.tenor, value.Brand, value.Model, value.Variant, value.Downpayment, value.segmentType, value.DealerCode, value.CC, value.UsedRcno, value.UsedEngineno, value.UsedChassisno, value.UsedYrsofmanufacture, value.UsedRegistrationdate, value.UsedVehicleAge, value.UsedHypothecationstatus, value.UsedNumberofowner, value.UsedKmdriven, value.UsedDealerquotation, value.UsedOBV, value.UsedFinalassetprice, value.UsedAssetageatmaturity, value.LSOFlag, appNo];
      return this.database.executeSql("UPDATE ORIG_POST_SANCTION SET loanAmount=?,tenure=?,brandName=?,model=?,variant=?,downpayment=?,segment=?,dealerName=?,cc=?,rcNo=?,engineNo=?,chassisNo=?,yearOfMan=?,registrationDate=?,vehicleAge=?,hypothecation=?,noofOwner=?,kmDriven=?,dealerQuotation=?,obv=?,assetPrice=?,assetAge=?,lsoFlag=?,modified='',valuesModified='N',undoProposal='N',scoreCardRerun='N',autoApprovalFlag='N',FieldInvFlag='N',ManualApprovalFlag='N',autoApprovalStatus='N',FieldInvStatus='N',ManualApprovalStatus='N',psmSubmitted='N',psmFlowState='',groupInboxFlag='Y' WHERE applicationNumber=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSanctionTable", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateManualApprovalForSubmit(appNo) {
      let data = [appNo];
      return this.database.executeSql(`UPDATE SUBMIT_STATUS SET manualApprovalSucess='Y' WHERE applicationNumber=?`, data).then((data) => {
  
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateManualApprovalForSubmit", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateCBSInsstatus(refId, id, value, PropNo, cbsTableflag, cbsStatus) {
      let data = [value, PropNo, refId, id];
      return this.database.executeSql(`UPDATE CBS_CREATION SET ${cbsStatus}='Y',${cbsTableflag}=? WHERE applicationNumber=? and refId=? and id=?`, data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateCBSInsstatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updatePostSancDocUploadStatus(documents): Promise<any> {
      // for(let i=0;i<documents.length;i++){
      return this.database.executeSql("UPDATE ORIG_POST_SANCTION_IMGS SET uploaded='Y' WHERE postSanImgId=?", [documents.postSanImgId]).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateNACHSubmitDetails", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
      // }
      // let insertRows = [];
      // documents.forEach(master => {
      //   insertRows.push([`UPDATE ORIG_POST_SANCTION_IMGS SET uploaded='Y' WHERE postSanImgId=?`,
      //     [master.postSanImgId]
      //   ]);
      // });
      // return this.database.sqlBatch(insertRows).then(result => {
      //   return result;
      // }, err => {
      //   console.log(err, "sqlbatch error");
      //   this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePostSancDocUploadStatus", "Update Failure", JSON.stringify(err));
      // })
    }
  
    updateDisbursementFlag(appNo) {
      let data = [appNo, this.globFunc.basicDec(localStorage.getItem('username'))];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET disbursementCheck='N' WHERE applicationNumber=? and createdUser=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateDisbursementFlag", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    updateInstakitStatus(appNo) {
      let data = [appNo];
      return this.database.executeSql("UPDATE CBS_CREATION SET instakitStatus='Y',cbsInstakitEnable='N' WHERE applicationNumber=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateInstakitStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    removeAllApplicantDetails(refId) {
      let data = [refId];
      return this.database.executeSql("DELETE FROM ORIG_APP_DETAILS where id=?", [refId]),
        this.database.executeSql("DELETE FROM ORIG_BASIC_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PERSONAL_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PRESENT_ADDRESS_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PERMANENT_ADDRESS_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_SOURCING_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PROOF_PROMOTER_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_PROMOTER_PROOF_IMGS where refId=?", data),
        this.database.executeSql("DELETE FROM SUBMIT_STATUS where refId=?", data),
        this.database.executeSql("DELETE FROM CASA_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM NOMINEE_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM SERVICE_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_SIGN_IMGS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_ANNEXURE_IMGS where refId=?", data),
        this.database.executeSql("DELETE FROM NACH_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM NACH_IMGS where refId=?", data),
        this.database.executeSql("DELETE FROM NACH_STATEMENT_IMGS where refId=?", data),
        this.database.executeSql("DELETE FROM VEHICLE_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM POSIDEXCHECK where refId=?", data),
        this.database.executeSql("DELETE FROM SCORECARD where refId=?", data),
        this.database.executeSql("DELETE FROM PDD_DOCUMENT_DETAILS where refId=?", data),
        this.database.executeSql("DELETE FROM PDD_DOCUMENT_IMAGES where refId=?", data),
        this.database.executeSql("DELETE FROM FIELDINSPECTION where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_POST_SANCTION_IMGS where refId=?", data),
        this.database.executeSql("DELETE FROM ORIG_POST_SANCTION where refId=?", data),
        this.database.executeSql("DELETE FROM CBS_CREATION where refId=?", data),
        this.database.executeSql("DELETE FROM REFERENCE_DETAILS where refId=?", data)
          .then(data => {
            return data;
          }, err => {
            console.log(err);
            this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeApplicantDetails", "Delete Failure", JSON.stringify(err));
            return err;
          });
    }
  
  
    insertPddDataDetailsSave(refId, id, value, pddDataId) {
      if (pddDataId == "" || pddDataId == undefined || pddDataId == null) {
        let data = [refId, id, value.rcNo, value.engineNo, value.chassisno, value.finalInvoice];
        return this.database.executeSql("INSERT INTO PDD_DATA_DETAILS(refId, id, rcNo, engineNo, chassisno, finalInvoice) values (?,?,?,?,?,?)", data).then(data => {
          return data;
        }, err => {
          console.log('Error: ', err);
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "PDD_DATA_DETAILS", "Insert Failure", JSON.stringify(err));
          return [];
        });
      } else {
        let data = [refId, id, value.rcNo, value.engineNo, value.chassisno, value.finalInvoice, pddDataId];
        return this.database.executeSql("UPDATE PDD_DATA_DETAILS SET refId=?, id=?, rcNo=?, engineNo=?, chassisno=?, finalInvoice=? WHERE pddDataId=?", data).then((data) => {
          return data;
        }, err => {
          console.log("err: " + JSON.stringify(err));
          this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "PDD_DATA_DETAILS", "Update Failure", JSON.stringify(err));
          return err;
        });
      }
    }
  
    getPddDataDetails(refId, id): Promise<any> {
      let data = [refId, id];
      return this.database.executeSql("SELECT * FROM PDD_DATA_DETAILS WHERE refId=? AND id=?", data).then((data) => {
        return this.getAll(data);
      }).catch(err => {
        console.log(err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getPddDetailsFromDd", "Retrieve Failure", JSON.stringify(err));
      })
    }
  
    updatePDDdocSuccessStatus(refId, id) {
      let data = [refId, id];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET pdDocUpload='Y' WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updatePDDdocSuccessStatus", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateBasicDetailsFromGroupInbox(value, refId, id) {
      // let data = [value.SanctionAmount, refId, id];
      // return this.database.executeSql("UPDATE ORIG_BASIC_DETAILS SET loanAmount=? WHERE refId=? and id=?", data).then((data) => {
      let data = [value.SanctionAmount, value.SfosLead.LeadMain.Lead.LoanDetails.TotalLoanAmt || '', refId, id];
      return this.database.executeSql("UPDATE ORIG_BASIC_DETAILS SET loanAmount=?,totalloanAmount=? WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateBasicDetailsFromGroupInbox", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    removeAllLoanProtectInsurance() {
      return this.database.executeSql("DELETE FROM LPI_INSURANCE", []).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeAllLoanProtectInsurance", "Delete Failure", JSON.stringify(err));
        return [];
      });
    }
    insertAllLoanProtectInsurance(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO LPI_INSURANCE(lpifromage,lpifromtenure,lpimultiplier,lpitoage,lpitotenure) values (?,?,?,?,?)",
          [master.lpifromage, master.lpifromtenure, master.lpimultiplier, master.lpitoage, master.lpitotenure]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllLoanProtectInsurance", "Insert Failure", JSON.stringify(err));
      })
    }
  
    getLoanProtectInsurance() {
      // let data = [tenure];
      return this.database.executeSql(`SELECT * FROM LPI_INSURANCE`, []).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getCASADetails", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    removeAllPddChargesMaster() {
      return this.database.executeSql("DELETE FROM PDD_CHARGES", []).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeAllPddChargesMaster", "Delete Failure", JSON.stringify(err));
        return [];
      });
    }
    insertAllPddChargesMaster(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO PDD_CHARGES(AmtFromRange,AmtToRange,PddCharges,prdCode) values (?,?,?,?)",
          [master.AmtFromRange, master.AmtToRange, master.PddCharges, master.prdCode]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllPddChargesMaster", "Insert Failure", JSON.stringify(err));
      })
    }
  
  
    getProductValuesScheme(prdCode) {
      return this.database.executeSql("SELECT * FROM PDD_CHARGES WHERE prdCode=?", [prdCode]).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getProductValuesScheme", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
  
    insertAllMasterData(master, type): Promise<any> {
      let insertRows = [];
      master.forEach(master => {
        insertRows.push(["INSERT INTO COMMON_MASTER_DATA (CODE, NAME, TYPE) VALUES (?, ?, ?)",
          [master.optionValue, master.optionDesc, type]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllMasterData", "Insert Failure", JSON.stringify(err));
      })
  
    }
  
    InsertProductValue(products): Promise<any> {
      let insertRows = [];
      products.forEach(PRD => {
        insertRows.push(["INSERT INTO PRODUCT_MASTER(prdCode, prdSchemeCode, prdDesc, prdamtFromRange, prdamtToRange, prdMainCat, prdNature, prdTenorFrom, prdTenorTo, prdLoanType, prdTenorType, prdBussRule, prdCoappFlag, prdGuaFlag, prdMoratoriumMax, prdAgeFrom, prdAgeTo, prdSubCat, prdSchemeId,prdEntityDocCount,prdAppDocCount,prdGuaDocCount,prdCoappDocCount,prdCibilScore, prdBranchList) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [PRD.prdCode, PRD.prdSchemeCode, PRD.prdDesc, PRD.prdamtFromRange, PRD.prdamtToRange, PRD.prdMainCat, PRD.prdNature, PRD.prdTenorFrom, PRD.prdTenorTo, PRD.prdLoanType, PRD.prdTenorType, PRD.prdBussRule, PRD.prdCoappFlag, PRD.prdGuaFlag, PRD.prdMoratoriumMax, PRD.prdAgeFrom, PRD.prdAgeTo, PRD.prdSubCat, PRD.prdSchemeId, PRD.prdEntityDocCount, PRD.prdAppDocCount, PRD.prdGuaDocCount, PRD.prdCoappDocCount, PRD.prdCibilScore, PRD.prdBranchList]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertProductValue", "Insert Failure", JSON.stringify(err));
      })
    }
  
    InsertOrganisation(orgMaster): Promise<any> {
      let insertRows = [];
      orgMaster.forEach(org => {
        insertRows.push(["INSERT INTO ORGANISATION_MASTER(OrgID, OrgName, OrgBranchCode, OrgCity, OrgState, OrgLevel) values (?,?,?,?,?,?)",
          [org.OrgID, org.OrgName, org.OrgBranchCode, org.OrgCity, org.OrgState, org.OrgLevel]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertOrganisation", "Insert Failure", JSON.stringify(err));
      })
  
    }
  
  
    insertDealerMaster(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO DEALER_MASTER(city,state,rowid,district,branchCode,dealerCode,dealerName,dealerEmpID,dealerEntity,dealerPan,dealerGstin,dealerType,crop,dealerCurAcc,dealerNumber,dealerIfsc,dealerBankName,dealerBranch,payout,payoutRecent,rlspActive,rlspTradeLimit,rlspAccNumber,status,segment,intrating,contactNumber1,contactNumber2,contactNumber3,emailId1,emailId2,emailId3,commContactNumber1,commContactNumber2,commEmailId1,commEmailId2,address,orgScode) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [master.city, master.state, master.rowid, master.district, master.branchCode, master.dealerCode, master.dealerName, master.dealerEmpID, master.dealerEntity, master.dealerPan, master.dealerGstin, master.dealerType, master.crop, master.dealerCurAcc, master.dealerNumber, master.dealerIfsc, master.dealerBankName, master.dealerBranch, master.payout, master.payoutRecent, master.rlspActive, master.rlspTradeLimit, master.rlspAccNumber, master.status, master.segment, master.intrating, master.contactNumber1, master.contactNumber2, master.contactNumber3, master.emailId1, master.emailId2, master.emailId3, master.commContactNumber1, master.commContactNumber2, master.commEmailId1, master.commEmailId2, master.address, master.orgScode]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertDealerMaster", "Insert Failure", JSON.stringify(err));
      })
    }
  
    InsertInterestRate(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(INT => {
        insertRows.push(["INSERT INTO INTEREST_RATE_MASTER_DATA(prdCode, AmtFromRange, AmtToRange, Mclr, SeqNO, IntType) values (?,?,?,?,?,?)",
          [INT.prdCode, INT.AmtFromRange, INT.AmtToRange, INT.Mclr, INT.SeqNO, INT.IntType]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertInterestRate", "Insert Failure", JSON.stringify(err));
      })
    }
  
    InsertStateCity(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(sc => {
        insertRows.push(["INSERT INTO STATE_CITY_MASTER(stateCode, stateName, cityCode, cityName) values (?,?,?,?)",
          [sc.stateCode, sc.stateName, sc.cityCode, sc.cityName]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "InsertStateCity", "Insert Failure", JSON.stringify(err));
      })
    }
  
    insertAllScoreCardMasterData(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO VEHICLESCORECARDMASTER(questionId, question, questionHeader) values (?,?,?)",
          [master.QuestionId, master.Question, master.QuestionHeader]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllScoreCardMasterData", "Insert Failure", JSON.stringify(err));
      })
    }
  
    insertAllVehicleBrandMasters(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO VEHICLEBRAND(optionDesc,optionValue) values (?,?)",
          [master.optionDesc, master.optionValue]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllVehicleBrandMasters", "Insert Failure", JSON.stringify(err));
      })
    }
  
    insertAllVehicleModelMasters(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO VEHICLEMODEL(makeId,modelId,modelName,displayName,section) values(?,?,?,?,?)",
          [master.makeId, master.modelId, master.modelName, master.displayName, master.section]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllVehicleModelMasters", "Insert Failure", JSON.stringify(err));
      })
    }
    insertAllVehicleVariantMasters(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO VEHICLEVARIANT(modelId,variantId,variantName,variantDisplayName,fuelType,transType) values (?,?,?,?,?,?)",
          [master.modelId, master.variantId, master.variantName, master.variantDisplayname, master.fuelType, master.transType]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllVehicleVariantMasters", "Insert Failure", JSON.stringify(err));
      })
    }
  
    insertAllVehiclePriceMasters(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO VEHICLEPRICES(variantId,variantDisplayName,cityId,price,rto,insurance,onRoadPrice) values (?,?,?,?,?,?,?)",
          [master.varianId, master.variantDisplayName, master.cityId, master.price, master.rto, master.insurance, master.onRoadPrice]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllVehiclePriceMasters", "Insert Failure", JSON.stringify(err));
      })
    }
    insertAllVehicleWorkflowMasters(masters): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO VEHICLEWORKFLOW(flowPoint,flowLevel,flowDesc,UserGroup,UserGroupName) values (?,?,?,?,?)",
          [master.flowPoint, master.flowLevel, master.flowDesc, master.UserGroup, master.UserGroupName,]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllVehicleWorkflowMasters", "Insert Failure", JSON.stringify(err));
      })
    }
  
    insertAllDocumentsVehicle(masters, types): Promise<any> {
      let insertRows = [];
      masters.forEach(master => {
        insertRows.push(["INSERT INTO Documents_Vehicle(docDescription,docType,docId,TYPES) values (?,?,?,?)",
          [master.docDescription, master.docType, master.docId, types]
        ]);
      });
      return this.database.sqlBatch(insertRows).then(result => {
        return result;
      }, err => {
        console.log(err, "sqlbatch error");
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertAllDocumentsVehicle", "Insert Failure", JSON.stringify(err));
      })
    }
  
    getProductBasedOnScheme(prdBranchList, prdSchemeId) {
      return this.database.executeSql("SELECT * FROM PRODUCT_MASTER WHERE prdBranchList LIKE '%" + prdBranchList + "%' and prdSchemeId=?", [prdSchemeId]).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getProductValuesScheme", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    updateSubmitIMDDetails(IMD, statId) {
      let data = [IMD, statId];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET IMD=? WHERE statId=?", data).then((data) => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "SUBMIT_LEAD_STATUS", "Update Success", JSON.stringify(data));
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "SUBMIT_LEAD_STATUS", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    documentUpload(value, appNo, status) {
      let data = [value.DocId, value.leadID, value.DocName, appNo, status];
      return this.database.executeSql("INSERT INTO DOCUMENT_UPLOAD(DocId, leadID,DocName, applicationNumber, docuploadstatus) values (?,?,?,?,?)", data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        return [];
      });
    }
  
    getdocumentUpload(appNo,) {
      let data = [appNo];
      return this.database.executeSql("SELECT * FROM DOCUMENT_UPLOAD WHERE docuploadstatus='N' and applicationNumber=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        return [];
      });
    }
  
    documentUploadUpdate(value, appNo, status) {
      let data = [value.DocId, value.DocName, status, value.leadID, value.docuploadId, appNo];
      return this.database.executeSql("UPDATE DOCUMENT_UPLOAD SET DocId=?, DocName=?, docuploadstatus=? WHERE leadID=? and docuploadId=? and applicationNumber=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    documentUploadStatus(status, appNo) {
      let data = [status, appNo];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET docUploadStatus=? WHERE applicationNumber=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
    documentResubmitStatus(status, appNo) {
      let data = [status, appNo];
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET docResubmit=? WHERE applicationNumber=?", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
  
    updateApplicationStatus(applicationStatus,refId){
      let data = [applicationStatus,refId]
      return this.database.executeSql("UPDATE SUBMIT_STATUS SET applicationStatus=? WHERE refId=?", data).then((data) => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateApplicationStatus", "Update Success", JSON.stringify(data));
        return data;
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateApplicationStatus", "Update Failure", JSON.stringify(err));
        return err;
      });
    }
  
  
    getHimarkScore(refId){
      let data = [refId];
      return this.database.executeSql("SELECT himarkScore FROM SUBMIT_STATUS WHERE refId=?", data).then((data) => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getHimarkScore", "Update Success", JSON.stringify(data));
         return this.getAll(data);
      }, err => {
        console.log("err: " + JSON.stringify(err));
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getHimarkScore", "Update Failure", JSON.stringify(err));
        return err;
      });
    }
  
    getApplicantType(leadId) {
      let data = [leadId];
      return this.database.executeSql("SELECT applicType FROM ORIG_SOURCING_DETAILS WHERE leadId=?", data).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getApplicantType", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    getApplicantidTypeByLeadid(leadId, idType) {
      return this.database.executeSql("SELECT * FROM KARZA_DATA WHERE leadId=? AND idType=?", [leadId, idType]).then(data => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getGivenSecondKarzaDetailsByLeadid", "Retrieve Failure", JSON.stringify(err));
        return [];
      });
    }
  
    insertErrorLog(value,pageName){
      let data = [localStorage.getItem('username'), this.device.uuid, moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"),value,pageName];
      return this.database.executeSql("INSERT INTO ERROR_LOG(username,deviceID,Timestamp,errorDesc,pageName) VALUES (?,?,?,?,?)", data).then((data) => {
        return data;
      }, err => {
        console.log("err: " + err);
        return err;
      })
    }
  
    getErrorLogsFromDB(value) {
      let data = [value.startDate, value.endDate];
      return this.database.executeSql("SELECT * FROM ERROR_LOG WHERE auditDate BETWEEN ? AND ?", data).then((data) => {
        return this.getAll(data);
      }, err => {
        console.log('Error: ', err);
        return [];
      })
    }
  
    updateMissingValuesInPS(value,refId,id){
      let data = [value.processingFee,value.advanceEmi, refId, id];
      return this.database.executeSql("UPDATE ORIG_BASIC_DETAILS SET processingFee=?,advanceEmi=? WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateMissingValuesInPS", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }
  
    updateORPinPostSanction(onRoadprice, refId,id) {
      let data = [onRoadprice, refId,id];
      return this.database.executeSql("UPDATE VEHICLE_DETAILS SET onRoadprice=? WHERE refId=? and id=?", data).then((data) => {
        return data;
      }, err => {
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateORPinPostSanction", "Update Failure", JSON.stringify(err));
        console.log("err: " + JSON.stringify(err));
        return err;
      });
    }

    insertStampDutyMaster(value) {
      let data = [value.state, value.applicablestampduty, value.rowid];
      return this.database.executeSql("INSERT INTO STAMPDUTY_MASTER(state, applicablestampduty,rowid) values (?,?,?)", data).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        return [];
      });
    }
  
    removeStampMasterData() {
      return this.database.executeSql("DELETE FROM STAMPDUTY_MASTER", []).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeStampMasterData", "Delete Failure", JSON.stringify(err));
        return [];
      });
    }
  
  getStampetails() {
    let data = [];
    return this.database.executeSql("SELECT * FROM STAMPDUTY_MASTER", data).then(data => {
      return this.getAll(data);
    }, err => {
      console.log('Error: ', err);
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getCASADetails", "Retrieve Failure", JSON.stringify(err));
      return [];
    });
  }

  duplicateAadharCheck(refId, promoIDRef) {
    let data = [refId, promoIDRef];
    return this.database.executeSql("SELECT * FROM ORIG_PROOF_PROMOTER_DETAILS WHERE refId=? AND promoIDRef=?", data).then((data) => {
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "ORIG_PROOF_PROMOTER_DETAILS", "Retrieve Success", JSON.stringify(data));
      return this.getAll(data);
    }, err => {
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "ORIG_PROOF_PROMOTER_DETAILS", "Retrieve Failure", JSON.stringify(err));
      console.log('Error: ', JSON.stringify(err));
      return [];
    })
  }

  updateAssetPricePostSanction(assetPriceAmt, refId, id) {
    let data = [assetPriceAmt, refId, id];
    return this.database.executeSql("UPDATE VEHICLE_DETAILS SET assetPrice=? WHERE refId=? and id=?", data).then((data) => {
      return data;
    }, err => {
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "updateAssetPricePostSanction", "Update Failure", JSON.stringify(err));
      console.log("err: " + JSON.stringify(err));
      return err;
    });
  }

  getProductBasedOnSchemeSpec(prdBranchList, prdSchemeId,sepcSubCode) {
    return this.database.executeSql("SELECT * FROM PRODUCT_MASTER WHERE prdBranchList LIKE '%" + prdBranchList + "%' and prdSchemeId=? and prdCode=?", [prdSchemeId,sepcSubCode]).then(data => {
      return this.getAll(data);
    }, err => {
      console.log('Error: ', err);
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getProductValuesScheme", "Retrieve Failure", JSON.stringify(err));
      return [];
    });
  }
  
  insertAepsStatus(aepsStatus,leadId) {
    let data = [aepsStatus,leadId];
    return this.database.executeSql("UPDATE EKYC_RESPONSE SET aespFlag =? WHERE leadId=?", data).then((data) => {
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertEKYCDetails", "Insert Success", JSON.stringify(data));
      return data;
    }, err => {
      console.log("root err: " + JSON.stringify(err));
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "insertEKYCDetails", "Insert Failure", JSON.stringify(err));
      return err;
    })
  }


  getEKYCDetails(leadId) {
    let data = [leadId];
    return this.database.executeSql("SELECT * FROM EKYC_RESPONSE WHERE leadId=?", data).then(data => {
      return this.getAll(data);
    }, err => {
      console.log('Error: ', err);
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "getEKYCDetails", "Retrieve Failure", JSON.stringify(err));
      return [];
    });
  }

  removeKarzaData(leadId) {
    return this.database.executeSql("DELETE FROM KARZA_DATA where leadId=?", [leadId]).then(data => {
      // this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeSourcingIdName", "Delete Success", JSON.stringify(data));
      return data;
    }, err => {
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeSourcingIdName", "Delete Failure", JSON.stringify(err));
      console.log('Error: ', err);
      return [];
    });
  }

  removeEkycData(leadId) {
    return this.database.executeSql("DELETE FROM EKYC_RESPONSE where leadId=?", [leadId]).then(data => {
      // this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeSourcingIdName", "Delete Success", JSON.stringify(data));
      return data;
    }, err => {
      this.addAuditTrail(moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss"), "removeSourcingIdName", "Delete Failure", JSON.stringify(err));
      console.log('Error: ', err);
      return [];
    });
  }
}
