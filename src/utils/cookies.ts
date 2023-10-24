import { AuthTokens } from 'api/auth/types';
import { CookieOptions, Response } from 'express';

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from './constants';

const cookiesOptions: CookieOptions = { sameSite: 'none', secure: true };

export const setAuthCookies = (tokens: AuthTokens, res: Response) => {
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refresh_token, cookiesOptions);
  res.cookie(ACCESS_TOKEN_COOKIE, tokens.access_token, cookiesOptions);
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(REFRESH_TOKEN_COOKIE, cookiesOptions);
  res.clearCookie(ACCESS_TOKEN_COOKIE, cookiesOptions);
};
