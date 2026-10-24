import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRY = '15m'; // short‑lived access token
const REFRESH_TOKEN_EXPIRY = '7d'; // long‑lived refresh token

type TokenPayload = jwt.JwtPayload & {
  email?: string;
  role?: string;
};

export function signAccess(payload: Record<string, unknown>, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function signRefresh(payload: Record<string, unknown>, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function verifyAccess(token: string, secret: string): TokenPayload {
  return jwt.verify(token, secret) as TokenPayload;
}

export function verifyRefresh(token: string, secret: string): TokenPayload {
  return jwt.verify(token, secret) as TokenPayload;
}
