import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/providers/global.service';
import { RestService } from 'src/providers/rest.service';


@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements AfterViewInit {

  @ViewChild('progressbar') progressbar: ElementRef;
  progressStatus = 0
  progress: number
  uploadProgress: number
  sucessMsg: string
  sucess: any = false
  @Input() totalImageCnt:number
  @Input() uploadImageCnt:number
  @Output() closeModal = new EventEmitter<any>();

  uploadSubscription: Subscription;
  uploadFailer: Subscription;

  constructor(public renderer: Renderer2, public masters: RestService, public globalFun: GlobalService) { }

  ngAfterViewInit() {  
    /* 
    In this Oninit function use to subscribe the progress data and pass into the UploadProgress 
    then call the setProgressbar function.
    */

    this.masters.resetProgress();
    this.uploadSubscription = this.masters.uploadProgress.subscribe({
      next: (progress: number) => {
      this.uploadProgress = progress
      console.log('progress ', this.uploadProgress);
      this.setProgressbar()
    },
    error: (err: any) => {
      console.log("ProgressBar Error", err);
    }
  })

    // img failed function
    this.uploadFailer = this.globalFun.uploadStatus.subscribe(data => {
      if(data == true) {
        if(this.uploadImageCnt == this.totalImageCnt) {
          this.sucess = true
          this.sucessMsg = 'Completed!'
        } else {
          this.sucess = true
          this.sucessMsg = 'Failed!'
        }
      }
    })
  }

  async setProgressbar() {
    
    if (this.uploadImageCnt <= this.totalImageCnt) {
    // progress event function call iterated untill totalimages are uploaded  

      for (let i = this.uploadImageCnt; i <= this.totalImageCnt; i++) {
        await this.progressFunction()
        this.progress = i
      }
      // if uploadimagecnt match with totalimagecnt then progress bar status change into sucess 
      if(this.uploadImageCnt == this.totalImageCnt) {
        this.progressStatus = 200
        this.renderer.setStyle(this.progressbar.nativeElement, 'width', this.progressStatus + 'px')
        this.sucess = true;
        this.sucessMsg = 'Completed!';
      }

    }
    else {
      
      this.progressStatus = 200
      this.renderer.setStyle(this.progressbar.nativeElement, 'width', this.progressStatus + 'px')
      this.sucess = true;
      this.sucessMsg = 'Completed!';
    }
  }

  progressFunction() {
    /* 
      this progressFunction use to get the uploadProgress value and passinto the 
      progressbar value then the uploading progress will be visible to user
    */

    return new Promise((resolve, reject) => {
      this.progressStatus = this.uploadProgress * 2
      this.renderer.setStyle(this.progressbar.nativeElement, 'width', this.progressStatus + 'px')
      if (this.progressStatus == 200) {
        this.progressStatus = 0
        this.renderer.setStyle(this.progressbar.nativeElement, 'width', this.progressStatus + 'px')
        this.uploadProgress = 0

        resolve(true)
      }

    })
  }

  close(event) {
    //this function helps to close the dynamic component once the progress completed.
    this.closeModal.emit(event);
  }

  ngOnDestroy() {
    if(this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
    if(this.uploadFailer) {
      this.uploadFailer.unsubscribe();
    }

  }



}

