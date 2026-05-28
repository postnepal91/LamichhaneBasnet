// lib/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccess } from './jwt';
import type { JwtPayload } from 'jsonwebtoken';
import LRU from 'lru-cache';

// Simple in‑memory rate limiter (10 requests per minute per IP)
const rateCache = new LRU<string, { count: number; reset: number }>({
  max: 5000,
  ttl: 60 * 1000, // 1 minute
});

export function requireAuth(req: NextRequest): {
  valid: boolean;
  response?: NextResponse;
  payload?: JwtPayload;
} {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { valid: false, response: NextResponse.json({ error: 'Authorization header missing' }, { status: 401 }) };
  }
  const token = authHeader.split(' ')[1];
  const payload = verifyAccess(token) as JwtPayload | null;
  if (!payload) {
    return { valid: false, response: NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }) };
  }
  return { valid: true, payload };
}

export function requireAdmin(req: NextRequest): {
  valid: boolean;
  response?: NextResponse;
  payload?: JwtPayload;
} {
  const auth = requireAuth(req);
  if (!auth.valid) return { valid: false, response: auth.response };
  if (auth.payload?.role !== 'admin') {
    return { valid: false, response: NextResponse.json({ error: 'Admin privileges required' }, { status: 403 }) };
  }
  return { valid: true, payload: auth.payload };
}

export function rateLimiter(req: NextRequest): {
  allowed: boolean;
  response?: NextResponse;
} {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
  const now = Date.now();
  const entry = rateCache.get(ip) ?? { count: 0, reset: now + 60 * 1000 };
  entry.count += 1;
  if (entry.count > 10) {
    // Too many requests
    return {
      allowed: false,
      response: NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 })
    };
  }
  rateCache.set(ip, entry);
  return { allowed: true };
}
