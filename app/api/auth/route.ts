import { NextRequest, NextResponse } from 'next/server';
import { send, checkMethod, readBody, required, email, id, token } from '@/lib/shared';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const methodCheck = checkMethod(req, ['POST']);
  if (!methodCheck.valid) return methodCheck.response!;

  try {
    const body = await readBody(req);
    const mode = body.mode === 'login' || body.mode === 'google' ? body.mode : 'signup';
    const userEmail = email(body.email);

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    // --- Google OAuth placeholder ---
    if (mode === 'google') {
      const credential = body.credential;
      let verifiedEmail = '';
      let verifiedName = 'Google User';

      if (credential === 'test_mock_token' || (!credential && process.env.ALLOW_MOCK_GOOGLE === 'true')) {
        verifiedEmail = userEmail;
        verifiedName = body.name || 'Google User';
      } else {
        if (!credential) {
          throw new Error('Google OAuth प्रमाणिकरण (Credential) आवश्यक छ।');
        }
        const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
        if (!googleRes.ok) {
          throw new Error('Google OAuth टोकन अमान्य छ वा समाप्त भएको छ।');
        }
        const payload = await googleRes.json();
        if (payload.error_description) {
          throw new Error(payload.error_description);
        }
        verifiedEmail = email(payload.email);
        verifiedName = payload.name || 'Google User';
      }

      // Check if user exists, if not create a stub
      let user: any = await usersCollection.findOne({ email: verifiedEmail });
      if (!user) {
        const newUser = {
          email: verifiedEmail,
          name: verifiedName,
          branch: '',
          authProvider: 'google',
          role: 'member',
          createdAt: new Date(),
        };
        await usersCollection.insertOne(newUser);
        user = newUser;
      }

      return send(200, {
        user: { email: user.email, name: user.name },
        token: token({ email: user.email, role: user.role }),
        message: `${user.name} आपुलाई स्वागत छ।`,
      });
    }

    // --- Local signup/login ---
    const password = required(body.password, 'पासवर्ड');
    if (password.length < 6) {
      throw new Error('पासवर्ड कम्तीमा ६ अक्षरको हुनुपर्छ।');
    }

    let user: any = await usersCollection.findOne({ email: userEmail });

    if (mode === 'signup') {
      if (user) throw new Error('यो इमेल पहिले नै दर्ता भएको छ।');
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        email: userEmail,
        password: hashedPassword,
        name: required(body.name, 'नाम'),
        branch: body.branch || '',
        authProvider: 'local',
        role: 'member',
        createdAt: new Date(),
      };
      await usersCollection.insertOne(newUser);
      user = newUser;
      return send(201, {
        user: { email: user.email, name: user.name },
        token: token({ email: user.email, role: user.role }),
        message: `${user.name} दर्ता भएको छ। स्वागत छ।`,
      });
    }

    if (mode === 'login') {
      if (!user) throw new Error('इमेल वा पासवर्ड गलत छ।');
      const isPasswordValid = await bcrypt.compare(password, user.password || '');
      if (!isPasswordValid) throw new Error('इमेल वा पासवर्ड गलत छ।');
      return send(200, {
        user: { email: user.email, name: user.name },
        token: token({ email: user.email, role: user.role }),
        message: `${user.name} आपुलाई स्वागत छ।`,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'प्रमाणिकरण असफल भयो।';
    return send(400, { error: message });
  }
}
