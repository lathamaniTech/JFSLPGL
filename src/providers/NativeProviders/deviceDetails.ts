import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';

// get device uuid version
export const getDeviceId = async () => {
  return (await Device.getId()).uuid;
};

// get device os version
export const getOSVersion = async () => {
  return (await Device.getInfo()).osVersion;
};

// get device battery level
export const logBatteryInfo = async () => {
  return (await Device.getBatteryInfo()).batteryLevel;
};

// it is giving application package version
export const getAppVersion = async () => {
  return (await App.getInfo()).version;
};
