// 네이버 인증 응답type
export interface ResponseNaverAuthTokenType {
  access_token: string,
  refresh_token: string,
  token_type: string,
  expires_in: number,
  error: string,
  error_description: string,
  }