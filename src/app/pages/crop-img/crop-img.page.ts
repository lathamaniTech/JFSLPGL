import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import Cropper from "cropperjs";
@Component({
  selector: 'app-crop-img',
  templateUrl: './crop-img.page.html',
  styleUrls: ['./crop-img.page.scss'],
})
export class CropImgPage implements OnInit {

  
  @ViewChild('image') imageElement: ElementRef;

  public cropper: Cropper;

  myImage = null;

  croppedImage = null;
  loading: any;
  pdd:boolean=false;
  

  constructor(public navCtrl: Router, 
    public navParams: ActivatedRoute, 
    public loadingCtrl: LoadingController, 
    public modalCtrl: ModalController
    ) {
    this.myImage = this.navParams.snapshot.paramMap.get('imgUrl');
    this.pdd = JSON.parse(this.navParams.snapshot.paramMap.get('pdd'));
    console.log(this.myImage); 
    console.log("this.pdd",this.pdd); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropImgPage');
  }


  async loadingFun(msg) {
    this.loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: `${msg}`,
      cssClass: 'spinnerCss',
      duration: 3000
    })
   await this.loading.present();
  }

  loadingDissmiss() {
    this.loading.dismiss();
  }


  ngOnInit() {

  }

  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: true,
      scalable: true,
      // aspectRatio: 16 / 9,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
      }
    });
  }

  reset() {
    this.cropper.reset();
  }

  clear() {
    this.cropper.clear();
    this.modalCtrl.dismiss();
  }

  zoomout() {
    this.cropper.zoom(-1);
  }
  zoomin() {
    this.cropper.zoom(1);
  }

  rotate() {
    this.cropper.rotate(90);
  }

  save() {
    this.loadingFun('Please Wait...');
    let croppedImgB64String: string = this.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.croppedImage = croppedImgB64String;
    let realData = this.croppedImage.split(",")[1]
    let blob = this.b64toBlob(realData, 'image/jpeg')
    if(this.pdd){
      this.modalCtrl.dismiss(this.croppedImage);
    }else{
      this.modalCtrl.dismiss(blob);
    }
    
  }


  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  
}

