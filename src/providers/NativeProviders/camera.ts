import { Injectable, inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { CropImageComponent } from 'src/app/components/crop-image/crop-image.component';
import { GlobalService } from '../global.service';
import * as AppType from '../../utility/AppInterfaces';
import * as AppConst from '../../utility/AppConstants';
import { Capacitor, Plugins } from '@capacitor/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { getOSVersion } from './deviceDetails';
const { WebPConvertorBase64 } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class CameraFunctionality {
  globalfun = inject(GlobalService);
  modalCtrl = inject(ModalController);

  takeImageWithoutCrop = () => {
    return new Promise(async (resolve, reject) => {
      const imageData = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 25,
      });
      resolve(imageData.dataUrl);
    });
  };

  takeImage = (type?: string): Promise<AppType.CapturedImageConfig> => {
    return new Promise(async (resolve, reject) => {
      try {
        let imgOpt =
          type && type != 'camera'
            ? {
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos,
                quality: 25,
              }
            : {
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 25,
              };
        const imageData = await Camera.getPhoto(imgOpt);
        const cropComponent = await this.modalCtrl.create({
          component: CropImageComponent,
          componentProps: { imgData: imageData },
          cssClass: '',
          showBackdrop: true,
          animated: true,
        });

        cropComponent.onDidDismiss().then(async (cropdata) => {
          if (cropdata.data == 'data:,') {
            this.globalfun.showAlert(
              AppConst.AlertText.alert,
              AppConst.AlertText.takeImgAgain
            );
          } else if (cropdata.data != null && cropdata.data != undefined) {
            let base64Data = cropdata.data.replace(
              AppConst.Base64DataString.base64TypeSet,
              ''
            );
            let imgSize = await this.getBase64ImageDataSize(base64Data);
            if (imgSize < 1024) {
              resolve({ path: base64Data, size: imgSize });
            } else {
              const data = await this.convertToWebPBase64(base64Data);
              resolve(data);
            }
          }
        });
        await cropComponent.present();
      } catch (err) {
        reject(err);
      }
    });
  };

  async convertToWebPBase64(data, sizeReq?: number) {
    // try {
    let imgData = sizeReq
      ? +getOSVersion() > 10
        ? `/storage/emulated/0/Documents/${data}`
        : `/storage/emulated/0/Android/data/com.jfs.vlwebp/files/${data}`
      : data;
    try {
      if (WebPConvertorBase64) {
        const result = await WebPConvertorBase64['convertToWebP']({
          base64: imgData,
        });
        if (result && result.data) {
          const size = await this.getBase64ImageDataSize(result.data);
          if (size) {
            return { path: result.data, size: size };
          }
        }
      }
    } catch (err) {
      this.globalfun.showAlert(
        AppConst.AlertText.alert,
        'convertToWebPBase64e - ' + err.message
      );
    }
    // } catch (e) {
    //   this.globalfun.showAlert(
    //     AppConst.AlertText.alert,
    //     'convertToWebPBase64e - ' + e.message
    //   );
    //   return null;
    // }
  }

  async getBase64ImageDataSize(base64Data: string): Promise<number> {
    let size = base64Data.length / 1024;
    let chargesFormatValue = size.toFixed(2).toString().split('.');
    console.log(chargesFormatValue);
    if (chargesFormatValue[1] <= '49') {
      size = Math.floor(size);
      console.log(size);
      return size;
    } else {
      size = Math.ceil(size);
      console.log(size);
      return size;
    }
  }

  async onFileChoose(event): Promise<AppType.FileDataConfig> {
    return new Promise(async (resolve, reject) => {
      try {
        if (event.target.files && event.target.files[0]) {
          let filename = event.target.files[0].name
            .toString()
            .replace(/ /gi, '_');
          let fileExtn = filename.split('.')[1];
          let setFileType: string;
          if (fileExtn == 'jpg' || fileExtn == 'jpeg' || fileExtn == 'png') {
            setFileType = 'image';
          } else {
            setFileType = 'file';
          }
          if (
            event.target.files[0].type == 'application/pdf' ||
            event.target.files[0].type == 'application/msword' ||
            event.target.files[0].type == 'application/vnd.ms-excel' ||
            event.target.files[0].type ==
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            event.target.files[0].type ==
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            event.target.files[0].type == 'text/plain' ||
            event.target.files[0].type == 'image/png' ||
            event.target.files[0].type == 'image/jpeg'
          ) {
            if (event.target.files[0].size <= 10000000) {
              let convertedPdfData = await this.convertDocBlobToBase64(
                event.target.files[0]
              );
              if (convertedPdfData.includes('data:application/pdf'))
                convertedPdfData = convertedPdfData.replace(
                  AppConst.Base64DataString.base64PDF,
                  ''
                );
              else
                convertedPdfData = convertedPdfData.replace(
                  AppConst.Base64DataString.base64TypeSet,
                  AppConst.Base64DataString.base64Charset
                );
              const filePath = `${AppConst.FolderNames.DOCUMENTS}/${
                new Date().getTime() + '.pdf'
              }`;
              const moveFile = await this.getWriteFileOnDevice(
                convertedPdfData,
                filePath
              );
              if (moveFile && moveFile != null && moveFile != undefined) {
                return resolve({
                  imgData: convertedPdfData,
                  fileType: setFileType,
                  fileName: filename,
                  fileExten: event.target.files[0].type,
                  url: moveFile,
                });
              }
            } else {
              this.globalfun.showAlert(
                AppConst.AlertText.alert,
                AppConst.AlertText.imageSize
              );
              reject(null);
            }
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async getWriteFileOnDevice(imgData: any, fileName: string): Promise<string> {
    try {
      const fileResult = await Filesystem.writeFile({
        data: imgData,
        path: fileName,
        directory: Directory.External,
        encoding: Encoding.UTF8,
        recursive: true,
      });
      return fileResult.uri;
    } catch (err) {
      this.globalfun.showAlert(AppConst.AlertText.alert, err.message);
      return null;
    }
  }

  async convertDocBlobToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        this.globalfun.showAlert('Alert-convertDocBlobToBase64', err.message);
      }
    });
  }

  async deleteFileOnDevice(folderName: string, fileName: string) {
    try {
      const delResult = await Filesystem.deleteFile({
        path: `${folderName}/${fileName}`,
        directory: Directory.External,
      });
      return delResult;
    } catch (err) {
      this.globalfun.showAlert(AppConst.AlertText.alert, err.message);
    }
  }

  async getReadFileData(folderName: string, fileName: string) {
    try {
      const sourcefile = await Filesystem.readFile({
        path: `${folderName}/${fileName}`,
        directory: Directory.External,
      });
      return sourcefile;
    } catch (err) {
      this.globalfun.showAlert(AppConst.AlertText.alert, err.message);
      return null;
    }
  }

  async getReadDirectory(folderName: string) {
    try {
      const data = await Filesystem.readdir({
        path: folderName,
        directory: Directory.External,
      });
      return data;
    } catch (err) {
      this.globalfun.showAlert(AppConst.AlertText.alert, err.message);
      return null;
    }
  }

  async getMakeDirectory(folderName: string) {
    try {
      const data = await Filesystem.mkdir({
        path: folderName,
        directory: Directory.External,
        recursive: true,
      });
      return data;
    } catch (err) {
      this.globalfun.showAlert(AppConst.AlertText.alert, err.message);
    }
  }
}
