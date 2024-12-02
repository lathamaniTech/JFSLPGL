import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';
import { SquliteSupportProviderService } from 'src/providers/squlite-support-provider.service';

@Component({
  selector: 'app-view-reference-details',
  templateUrl: './view-reference-details.component.html',
  styleUrls: ['./view-reference-details.component.scss'],
})
export class ViewReferenceDetailsComponent {

  referenceDetails = [];
  submitDisable = false;

  constructor(public navParams:NavParams,
    // public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public sqlsupport: SquliteSupportProviderService,
    public globalData: DataPassingProviderService) {
    this.referenceDetails = this.navParams.get('viewRefDetails');
    console.log(this.referenceDetails,"this.referenceDetails");
    if (this.navParams.get('submitDisable')) {
      this.submitDisable = true;
    }
  }

  openDetails(record) {
    this.modalCtrl.dismiss(record);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  deleteReferenceDetails(value){
    console.log(value,"deleteeeeeeee");
    if(this.submitDisable){
      this.globalData.showAlert('Alert','Submitted Reference details cannot be deleted');
    }else{
      let index: number = this.referenceDetails.indexOf(value);
      this.referenceDetails.splice(index, 1);
     this.sqlsupport.deleteRefereceDetails(value.refId,value.id,value.detailId).then(data=>{
       this.globalData.showAlert('Alert','Reference detail deleted successfully');
     });
    }
  }


}
