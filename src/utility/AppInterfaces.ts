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

export interface FileDataConfig {
  imgData: string;
  fileType: string;
  fileName: string;
  fileExten: string;
  url: string;
}

export interface BioDeviceConfig {
  code: string;
  name: string;
}

export interface ImgeSizeConfig {
  size: number;
}

export interface AccessTokenRequest {
  grant_type: string;
  client_id: string;
  client_secret: string;
  username?: string;
  password?: string;
  refresh_token?: string;
}

export interface ORPAuthRequestUsed {
  transaction_type: string;
  customer_type: string;
  make: string;
  model: string;
  year: string;
  trim: string;
  kms_driven: string;
  city: string;
  noOfOwners: string;
}

export interface RCNumberRequest {
  rc_number: string;
}

export interface ORPAuthRequestNew {
  category: string;
  make?: string;
  model?: string;
  year?: string;
  trim?: string;
  city?: string;
}
