import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from 'src/providers/api-interceptor.service';
import { SqliteService } from 'src/providers/sqlite.service';
import { GlobalService } from 'src/providers/global.service';
import { RestService } from 'src/providers/rest.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { SquliteSupportProviderService } from 'src/providers/squlite-support-provider.service';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BatteryStatus } from '@awesome-cordova-plugins/battery-status/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { SharedModule } from 'src/modules/sharedModule/sharedModule';
import { DirectivesModule } from 'src/modules/directives/directives.module';
import { PipesModule } from 'src/modules/pipes/pipes.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { OnRoadPriceService } from 'src/providers/on-road-price.service';
// import { IonicSelectableComponent } from 'ionic-selectable';

// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { Base64 } from '@ionic-native/base64';
// import { AppAvailability } from '@ionic-native/app-availability';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { File } from '@ionic-native/file';
// import { Crop } from '@ionic-native/crop';
// import { AppVersion } from '@ionic-native/app-version';
// import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    PipesModule,
    IonicSelectableModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Device,
    Network,
    SQLite,
    SQLitePorter,
    HttpClient,
    AppVersion,
    HTTP,
    BatteryStatus,
    Diagnostic,
    GlobalService,
    OnRoadPriceService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
