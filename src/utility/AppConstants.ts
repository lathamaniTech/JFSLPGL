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

export enum ORPApiStrings {
  url = 'https://apig.droom.in/dss/',
  endPointCatalog = 'enterprise-catalog',
  endPointORP = 'v2/onroad-price',
  endPointUsedP = 'enterprise-used-price-range',
  endPointRC = 'enterprise-history-report',
  category = 'category',
  model = 'model',
  variant = 'variant',
  ORP = 'ORP',
}

export enum UserCredentials {
  usernamePre = 'kaustubh.prahladka@janabank.com',
  passwordPre = '2ArAHY322',
  clientSecretPre = 'dd8538e4e1dea8e218ca1f65dce6d63faecb5e9628f2d58adbf161667acc8943',
  clientIdPre = '9486339',
  usernameProd = 'anubhav.goel@janabank.com',
  passwordProd = '2ArAHY320',
  clientSecretProd = '42471dc9c8dbc5ac179d9051fc9ae35c990c0ae3197615f92861d63ebf8dcf7a',
  clientIdProd = '9486338',
}

export enum FolderNames {
  DOCUMENTS = 'Documents',
}

export const LoadingText = {
  pleaseWait: 'Please wait...',
};

export const AlertText = {
  alert: 'Alert',
  imageSize: 'Document Should be lesser then 10MB!',
  imgSize2mb: 'Image Size should be lesser then (2-MB),Please Capture again!',
  takeImgAgain: 'Please again take photo',
};

export const Base64DataString = {
  base64Charset: 'data:image/*;charset=utf-8;base64,',
  base64TypeSet: 'data:image/jpeg;base64,',
  base64PDF: 'data:application/pdf;base64,',
};
