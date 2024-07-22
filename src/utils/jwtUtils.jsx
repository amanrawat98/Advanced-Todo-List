import { jwtDecode } from "jwt-decode";
import CryptoJS from 'crypto-js';

export const createJWT = (payload, secretKey) => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const base64UrlEncode = (obj) => {
    return btoa(JSON.stringify(obj))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const encode = (str) => {
    return btoa(str)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const headerBase64Url = base64UrlEncode(header);
  const payloadBase64Url = base64UrlEncode(payload);

  const signature = encode(
    CryptoJS.HmacSHA256(headerBase64Url + "." + payloadBase64Url, secretKey).toString()
  );

  return `${headerBase64Url}.${payloadBase64Url}.${signature}`;
};

export const decodeJWT = (token) => {
  return jwtDecode(token);
};

export const deleteToken = (tokenName)=> {
  localStorage.removeItem(tokenName);
}


