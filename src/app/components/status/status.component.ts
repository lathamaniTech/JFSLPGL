import { Component, NgZone, OnInit } from '@angular/core';
import { BatteryStatus } from '@awesome-cordova-plugins/battery-status/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { GlobalService } from 'src/providers/global.service';
// import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {

  gpsStatus: any = new Subject();
  wifiStatus: any = new Subject();
  batteryPercent: any = new Subject();

  constructor(
    public globFunc: GlobalService,
    public network: Network,
    public batteryStatus: BatteryStatus,
    public platform: Platform,
    public zone: NgZone,
    // public geolocation: Geolocation,
    // public events: Events,
  ) {
    this.globFunc.getGpsStatus().subscribe((gps) => {
      this.gpsStatus = gps;
    });
    this.globFunc.getWifiStatus().subscribe((wifi) => {
      this.wifiStatus = wifi;
    });
    this.globFunc.getBatteryStatus().subscribe((battery) => {
      this.batteryPercent = battery;
      console.log(battery)
    });
  }

  ngOnInit() {
    // this.wifiStatus = this.globFunc._wifiStatus();
  }

}
