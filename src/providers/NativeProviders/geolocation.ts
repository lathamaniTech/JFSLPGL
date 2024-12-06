import { Geolocation } from '@capacitor/geolocation';
import * as AppType from '../../utility/AppInterfaces';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

export const getDeviceGpsStatus = async (): Promise<string> => {
  return Geolocation.checkPermissions()
    .then((enabled) => {
      return null;
    })
    .catch(async (err) => {
      console.log('location', err);
      const data = await requestPermissions();
      return data;
    });
};

export const requestPermissions = async () => {
  try {
    await Geolocation.requestPermissions();
  } catch (err) {
    return 'Please enable location on device';
  }
};

export const getLocationCoordinates = async () => {
  try {
    const locationData = await Geolocation.getCurrentPosition();
    console.log(locationData);
    if (locationData && locationData.coords) {
      let { latitude, longitude, altitude, accuracy } = locationData.coords;
      const addressData = await getReverseGeocodeDetails({
        latitude,
        longitude,
        altitude,
        accuracy,
      });
      let addData = {
        address1:
          addressData && addressData.length > 0
            ? addressData[0].areasOfInterest[0]
            : '',
        address2:
          addressData && addressData.length > 0
            ? addressData[0].subLocality
            : '',
        city:
          addressData && addressData.length > 0 ? addressData[0].locality : '',
        state:
          addressData && addressData.length > 0
            ? addressData[0].administrativeArea
            : '',
        country:
          addressData && addressData.length > 0
            ? addressData[0].countryName
            : '',
        pincode:
          addressData && addressData.length > 0
            ? addressData[0].postalCode
            : '',
      };
      return {
        locationCode: { latitude, longitude, altitude, accuracy },
        address: addData,
      };
    }
  } catch (error) {
    //   navigator.geolocation.getCurrentPosition((locationData) => {});
    alert(`getLocationDetails- ${error.message}`);
    //   console.log('Error getting location', error);
  }
};

export const getReverseGeocodeDetails = async (
  locationCode: AppType.LocationCoord
) => {
  let nativeGeo = new NativeGeocoder();
  try {
    const addressData = await nativeGeo.reverseGeocode(
      locationCode.latitude,
      locationCode.longitude,
      { useLocale: true, maxResults: 5 }
    );
    console.log(addressData);
    return addressData;
  } catch (error) {
    if (error instanceof Error) alert(`${error.message}`);
    else alert(`Location Address details fecting error.`);
  }
};

export const returnDistanceFromLatLong = (lat1, lon1, lat2, lon2): number => {
  // console.log(lat1 + " " + lon1 + " " + lat2 + " " + lon2)
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = Math.abs(lon1 - lon2);
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return Math.round(dist);
};
// }
