const URL_MFA_BASE_MFA = 'https://ocapi-app.arlo.com/api';

export interface AuthUrlsMfa {
  GET_AUTH_TOKEN: string;
  GET_FACTORS: string;
  REQUEST_MFA_CODE: string;
  START_NEW_SESSION: string;
  SUBMIT_MFACODE: string;
  VERIFY_AUTH: string;
}

const AUTH_URLS_MFA: AuthUrlsMfa = {
  GET_AUTH_TOKEN: `${URL_MFA_BASE_MFA}/auth`,
  GET_FACTORS: `${URL_MFA_BASE_MFA}/getFactors?data=`,
  REQUEST_MFA_CODE: `${URL_MFA_BASE_MFA}/startAuth`,
  START_NEW_SESSION: `https://myapi.arlo.com/hmsweb/users/session/v2`,
  SUBMIT_MFACODE: `${URL_MFA_BASE_MFA}/finishAuth`,
  VERIFY_AUTH: `${URL_MFA_BASE_MFA}/validateAccessToken?data=`,
};

export default AUTH_URLS_MFA;
