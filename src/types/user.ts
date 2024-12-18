export interface UserInfo {
  accessToken: string;
  refreshToken: string;
  affiliatedConfirmation: boolean;
  challengedConfirmation: boolean;
  role: string;
}
export interface kakaoType {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}
