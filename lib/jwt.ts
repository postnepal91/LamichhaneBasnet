import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRY = '15m'; // short‑lived access token
const REFRESH_TOKEN_EXPIRY = '7d'; // long‑lived refresh token

export function signAccess(payload: Record<string, any>, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function signRefresh(payload: Record<string, any>, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function verifyAccess(token: string, secret: string) {
  return jwt.verify(token, secret) as Record<string, any>;
}

export function verifyRefresh(token: string, secret: string) {
  return jwt.verify(token, secret) as Record<string, any>;
}
