import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';

export const getDeviceId = async () => {
  return (await Device.getId()).uuid;
};

export const getOSVersion = async () => {
  return (await Device.getInfo()).osVersion;
};

export const logBatteryInfo = async () => {
  return (await Device.getBatteryInfo()).batteryLevel;
};

export const getAppVersion = async () => {
  return (await App.getInfo()).version;
};
