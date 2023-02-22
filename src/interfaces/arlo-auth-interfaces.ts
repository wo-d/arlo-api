import { FactorRole, FactorType, Verb } from '../types';

export interface HttpRequest {
  verb: Verb;
  url: string;
  body?: Record<string, any>;
  headers: object;
}

export interface ArloAuthResponse {
  token: string;
  userId: string;
  authenticated: number;
  issued: number;
  expiresIn: number;
  mfa: boolean;
  authCompleted: boolean;
  type: string;
  MFA_State: string;
}

export interface MfaRequestResponse {
  factorAuthCode: string;
}

export interface AuthResponse {
  authToken: string;
  /**
   * Unix timestamp representing the date the token was issued.
   */
  authenticated: number;
  userID: string;
}

export interface MfaFactorResponse {
  items: Array<MfaFactor>;
}

export interface MfaFactor {
  factorId: string;
  factorType: FactorType;
  displayName: string;
  factorNickname: string;
  applicationId: string;
  applicationName: string;
  factorRole: FactorRole;
}
