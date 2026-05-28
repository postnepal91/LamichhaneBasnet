import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_local_dev_123!';

export function send(status: number, data: any) {
  return NextResponse.json(data, { status });
}

export function checkMethod(req: NextRequest, allowed: string[] = ['POST']) {
  if (!allowed.includes(req.method)) {
    return { valid: false, response: send(405, { error: 'यो API विधि समर्थित छैन।' }) };
  }
  return { valid: true };
}

export async function readBody(req: NextRequest) {
  try {
    const text = await req.text();
    if (!text) return {};
    return JSON.parse(text);
  } catch {
    throw new Error('JSON अनुरोध अमान्य छ।');
  }
}

export function required(value: any, label: string) {
  if (!value || String(value).trim().length === 0) {
    throw new Error(`${label} आवश्यक छ।`);
  }
  return String(value).trim();
}

export function email(value: any) {
  const clean = required(value, 'इमेल').toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    throw new Error('कृपया सही इमेल राख्नुहोस्।');
  }
  return clean;
}

export function id(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function token(payload: any) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  // Include exp: 7 days from now
  const body = Buffer.from(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(tokenStr: string): any | null {
  try {
    const parts = tokenStr.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');
    if (signature !== expectedSignature) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    // Check expiry
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function requireAuth(req: NextRequest): { valid: boolean; payload?: any; response?: NextResponse } {
  const authHeader = req.headers.get('authorization') || '';
  const tokenStr = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!tokenStr) {
    return { valid: false, response: send(401, { error: 'प्रमाणिकरण आवश्यक छ। कृपया लगइन गर्नुहोस्।' }) };
  }
  const payload = verifyToken(tokenStr);
  if (!payload) {
    return { valid: false, response: send(401, { error: 'टोकन अमान्य वा समाप्त भएको छ। पुनः लगइन गर्नुहोस्।' }) };
  }
  return { valid: true, payload };
}

export function requireAdmin(req: NextRequest): { valid: boolean; payload?: any; response?: NextResponse } {
  const auth = requireAuth(req);
  if (!auth.valid) return auth;
  if (auth.payload?.role !== 'admin') {
    return { valid: false, response: send(403, { error: 'यो कार्यका लागि प्रशासक अनुमति चाहिन्छ।' }) };
  }
  return auth;
}
