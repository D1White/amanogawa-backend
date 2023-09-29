import { AuthTokens } from 'api/auth/types';
import { Response } from 'express';

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from './constants';

export const setAuthCookies = (tokens: AuthTokens, res: Response) => {
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refresh_token);
  res.cookie(ACCESS_TOKEN_COOKIE, tokens.access_token);
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(REFRESH_TOKEN_COOKIE);
  res.clearCookie(ACCESS_TOKEN_COOKIE);
};
