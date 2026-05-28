import { NextRequest, NextResponse } from 'next/server';
import { send, checkMethod, readBody, required, email, id, token } from '@/lib/shared';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signAccess, signRefresh, verifyRefresh, verifyAccess } from '@/lib/jwt';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const methodCheck = checkMethod(req, ['POST']);
  if (!methodCheck.valid) return methodCheck.response!;

  try {
    const body = await readBody(req);
    const mode = body.mode || 'signup';
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
      if (user) throw new Error('यो इमेल पहिले नै दर्ता गरिएको छ।');
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        email: userEmail,
        password: hashedPassword,
        name: required(body.name, 'नाम'),
        branch: body.branch || '',
        authProvider: 'local',
        role: 'member',
        emailVerified: false,
        createdAt: new Date(),
      };
      await usersCollection.insertOne(newUser);
      user = newUser;
      // Send verification email (link) – URL can be handled on frontend
      const verificationToken = signAccess({ email: userEmail }, process.env.JWT_SECRET!);
      const verifyLink = `${process.env.BASE_URL || ''}/api/auth?mode=verify_email&token=${verificationToken}`;
      await sendEmail(userEmail, 'Verify your email', `<p>क्लिक गरेर इमेल प्रमाणित गर्नुहोस्: <a href="${verifyLink}">Verify Email</a></p>`);
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
        refreshToken: signRefresh({ email: user.email, role: user.role }, process.env.JWT_SECRET!),
        message: `${user.name} आपुलाई स्वागत छ।`,
      });
    }

    // --- Email verification ---
    if (mode === 'verify_email') {
      const verificationToken = required(body.token, 'Verification token');
      const payload = verifyAccess(verificationToken, process.env.JWT_SECRET!);
      if (!payload || payload.email !== userEmail) throw new Error('अवैध प्रमाणिकरण टोकन');
      await usersCollection.updateOne({ email: userEmail }, { $set: { emailVerified: true } });
      return send(200, { message: 'इमेल सफलतापूर्वक प्रमाणित भयो।' });
    }

    // --- Request password reset ---
    if (mode === 'reset_password') {
      const targetUser = await usersCollection.findOne({ email: userEmail });
      if (!targetUser) throw new Error('इमेल भेटिएन।');
      const resetToken = signRefresh({ email: userEmail }, process.env.JWT_SECRET!);
      const resetLink = `${process.env.BASE_URL || ''}/reset?token=${resetToken}`;
      await sendEmail(userEmail, 'Password Reset', `<p>पासवर्ड रिसेट गर्न यहाँ क्लिक गर्नुहोस्: <a href="${resetLink}">Reset Password</a></p>`);
      return send(200, { message: 'पासवर्ड रिसेट इमेल पठाइयो।' });
    }

    // --- Confirm password reset ---
    if (mode === 'reset_password_confirm') {
      const resetToken = required(body.token, 'Reset token');
      const newPassword = required(body.newPassword, 'नयाँ पासवर्ड');
      const payload = verifyRefresh(resetToken, process.env.JWT_SECRET!);
      if (!payload || payload.email !== userEmail) throw new Error('अवैध रिसेट टोकन');
      if (newPassword.length < 6) throw new Error('पासवर्ड कम्तीमा ६ अक्षरको हुनुपर्छ।');
      const hashed = await bcrypt.hash(newPassword, 10);
      await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashed } });
      return send(200, { message: 'पासवर्ड सफलतापूर्वक परिमार्जन भयो।' });
    }

    // --- Refresh access token ---
    if (mode === 'refresh_token') {
      const refresh = required(body.refreshToken, 'Refresh token');
      const payload = verifyRefresh(refresh, process.env.JWT_SECRET!);
      if (!payload) throw new Error('अवैध रिफ्रेश टोकन');
      const newAccess = signAccess({ email: payload.email, role: payload.role }, process.env.JWT_SECRET!);
      return send(200, { accessToken: newAccess });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'प्रमाणिकरण असफल भयो।';
    return send(400, { error: message });
  }
}
