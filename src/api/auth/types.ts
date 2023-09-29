export type JwtPayload = {
  id: string;
  username: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};
