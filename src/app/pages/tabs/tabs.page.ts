import { Component, ViewChild } from '@angular/core';
import { IonContent, IonSlides, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/providers/global.service';
import { App } from '@capacitor/app';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';
import { NomineedetailsComponent } from 'src/app/components/nomineedetails/nomineedetails.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  submitDisable: boolean = true;
  hide: boolean = false;
  tab1 : boolean = true;
  tab2 : boolean = false;
  tab3 : boolean = false;
  janaAccCheck: boolean = false;
  tabs = "casa";
  homeTick: boolean = false;
  businessTick: boolean = false;
  collateralTick: boolean = false;
  @ViewChild('mySlider', { static: false }) slider: IonSlides;
  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild(NomineedetailsComponent, { static: true }) nominee: NomineedetailsComponent;
  slides: any
  constructor(
    public datapassing: DataPassingProviderService,
    public navParams: NavParams, public globFunc: GlobalService) {
    this.slides = [
      { id: 'casa' },
      { id: 'nominee' },
      { id: 'service' },
    ];
    this.datapassing.assetsEvent.subscribe((val: any) => {
      if (val.value == 'Y' && val.title == 'nomineeJana') {
        this.hide = true;
        this.janaAccCheck = true;
        this.tab1 = true;
        this.tab2 = true;
        this.tab3 = true;
      } else if (val.value == 'Y' && val.title == 'nominee') {
        this.hide = true;
        this.janaAccCheck = true;
        this.tab1 = true;
        this.tab2 = true;
        this.tab3 = true;
      } else if (val.value == 'N' && val.title == 'nominee') {
        this.hide = false;
        this.janaAccCheck = true;
        this.tab1 = true;
        this.tab2 = false;
        this.tab3 = true;
      } else if (val.value == 'N') {
        this.hide = false;
        this.janaAccCheck = false;
        this.tab1 = true;
        this.tab2 = false;
        this.tab3 = false;
      } else if (val.value == 'Y' && val.title == 'guaran'){
        this.nominee.fetchGuaranDetails();
      } else {
        this.janaAccCheck = false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad nachDetailsPage');
    this.globFunc.publishPageNavigation({ title: 'CASA Details', component: TabsPage });
  }

  onSegmentChanged(segmentButton) {
    try {
      const selectedIndex = this.slides.findIndex(slide => {
        return slide.id == segmentButton.detail.value;
      })
      this.slider.slideTo(selectedIndex);
    } catch (error) {
      console.log(error, "CoreLeadPage-onSegmentChanged");
    }
  }

  ///to trigger segment change when respective slide is slided.
  async onSlideChanged(slider) {
    let selectedSlide = await this.slider.getActiveIndex();
    const currentSlide = await this.slides[selectedSlide];
    this.tabs = currentSlide.id;
    this.scrollToTop();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  ionViewWillLeave() {
    localStorage.setItem("submit", "false");
  }

}
