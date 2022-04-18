import * as CryptoJS from 'crypto-js';

export const removeNullProperties: object = (data: object) => {
  if (Array.isArray(data)) {
    return data;
  }
  Object.keys(data).forEach((key: string) => {
    const value = data[key];
    const hasProperties = value && Object.keys(value).length > 0;
    if (value === null) {
      delete data[key];
    } else if (typeof value !== 'string' && hasProperties) {
      removeNullProperties(value);
    }
  });
  return data;
};

export const sha256 = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};
