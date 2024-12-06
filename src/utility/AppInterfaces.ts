export interface NetworkDataConfig {
  connected: boolean;
  connectionType: string;
}

export interface LocationCoord {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
}
export interface LocationAddressData {
  address1: string | null;
  address2: string | null;
  city: string | null;
  district: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
}

export interface CapturedImageDataConfig {
  native: string;
  webview: string;
  name: string;
  imgStatus: string;
  docType: string;
  size: number;
}

export interface CapturedImageConfig {
  path: any;
  size: number;
}
