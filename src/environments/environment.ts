// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'Local Environment',
  // apiURL: 'http://192.168.0.246:9098'
  // apiURL: 'http://192.168.0.91:9091/', //mani
  // apiURL: 'http://192.168.0.174:9091/', //thouseefs
  // apiURL: 'http://192.168.0.85:9091/',  //jabaraj
  // apiURL: 'http://192.168.5.34:9091/',  //godantharaman   username="RO1290"  password="laps"
  // apiURL: 'http://192.168.0.155:9092/',  //pradeep
  apiURL: 'https://lendperfectpre.janabank.com/',   //PreProd 
  // apiURL: 'https://lendperfect.janabank.com/',  //production
  localKarza:false,
  patch: 'LIVE',
  pointLocal: false, // to bypass sms/otp function in local environment set to true.
  local : false,
  uatlive : true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
