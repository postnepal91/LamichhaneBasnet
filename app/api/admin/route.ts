import { NextRequest } from 'next/server';
import { send, checkMethod, readBody, requireAdmin, required } from '@/lib/shared';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { logAction } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const methodCheck = checkMethod(req, ['POST']);
  if (!methodCheck.valid) return methodCheck.response!;

  const auth = requireAdmin(req);
  if (!auth.valid) return auth.response!;

  try {
    const body = await readBody(req);
    const action = required(body.action, 'action');
    const { db } = await connectToDatabase();

    switch (action) {

      // --- Dashboard stats ---
      case 'stats': {
        const [users, contacts, contributions, archives] = await Promise.all([
          db.collection('users').countDocuments(),
          db.collection('contacts').countDocuments(),
          db.collection('contributions').countDocuments(),
          db.collection('archives').countDocuments(),
        ]);
        const pendingContributions = await db.collection('contributions').countDocuments({ status: 'pending' });
        await logAction(auth.payload!.email, 'stats', { users, contacts, contributions, archives, pendingContributions });
      return send(200, { users, contacts, contributions, archives, pendingContributions });
      }

      // --- List all users ---
      case 'list_users': {
        const users = await db.collection('users')
          .find({}, { projection: { password: 0 } })
          .sort({ createdAt: -1 })
          .limit(100)
          .toArray();
        await logAction(auth.payload!.email, 'list_users', { count: users.length });
      return send(200, { users });
      }

      // --- Promote/demote user role ---
      case 'set_role': {
        const targetEmail = required(body.email, 'इमेल');
        const role = body.role === 'admin' ? 'admin' : 'member';
        await db.collection('users').updateOne({ email: targetEmail }, { $set: { role } });
        await logAction(auth.payload!.email, 'set_role', { targetEmail, role });
      return send(200, { message: `${targetEmail} को भूमिका ${role} मा परिवर्तन भयो।` });
      }

      // --- List contact submissions ---
      case 'list_contacts': {
        const contacts = await db.collection('contacts')
          .find({})
          .sort({ createdAt: -1 })
          .limit(100)
          .toArray();
        await logAction(auth.payload!.email, 'list_contacts', { count: contacts.length });
      return send(200, { contacts });
      }

      // --- List contributions with filter ---
      case 'list_contributions': {
        const filter = body.status ? { status: body.status } : {};
        const contributions = await db.collection('contributions')
          .find(filter)
          .sort({ createdAt: -1 })
          .limit(100)
          .toArray();
        await logAction(auth.payload!.email, 'list_contributions', { count: contributions.length, filter: body.status || null });
      return send(200, { contributions });
      }

      // --- Approve or reject a contribution ---
      case 'review_contribution': {
        const contribId = required(body.submissionId, 'submissionId');
        const status = body.status === 'approved' ? 'approved' : 'rejected';
        await db.collection('contributions').updateOne(
          { submissionId: contribId },
          { $set: { status, reviewedBy: auth.payload!.email, reviewedAt: new Date() } }
        );
        await logAction(auth.payload!.email, 'review_contribution', { contribId, status });
      return send(200, { message: `कथाको स्थिति "${status}" मा परिवर्तन भयो।` });
      }

      // --- Delete a user ---
      case 'delete_user': {
        const targetEmail = required(body.email, 'इमेल');
        if (targetEmail === auth.payload!.email) throw new Error('आफ्नै खाता मेटाउन मिल्दैन।');
        await db.collection('users').deleteOne({ email: targetEmail });
        await logAction(auth.payload!.email, 'delete_user', { targetEmail });
      return send(200, { message: `${targetEmail} मेटाइयो।` });
      }

      default:
        return send(400, { error: 'अज्ञात कार्य।' });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'प्रशासन कार्य असफल भयो।';
    return send(400, { error: message });
  }
}
