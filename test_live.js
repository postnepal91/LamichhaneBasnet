const https = require('https');

const BASE = 'https://vercel-lb-nepali.vercel.app';

function post(path, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const url = new URL(path, BASE);
    const req = https.request(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        const parsed = JSON.parse(raw);
        const status = res.statusCode === 200 ? '✅ PASS' : '❌ FAIL';
        console.log(`${status} [${res.statusCode}] ${path}`);
        console.log(`   → ${parsed.message || parsed.error}\n`);
        resolve({ status: res.statusCode, data: parsed });
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  const testEmail = `test_${Date.now()}@example.com`;
  console.log('=== LIVE SITE BACKEND TESTS ===');
  console.log(`URL: ${BASE}`);
  console.log(`Test email: ${testEmail}\n`);

  // 1. Signup
  console.log('--- 1. Signup ---');
  await post('/api/auth', { mode: 'signup', name: 'Live Test User', email: testEmail, password: 'TestPass123', branch: 'Gorkha' });

  // 2. Duplicate signup (should fail)
  console.log('--- 2. Duplicate Signup (expect fail) ---');
  await post('/api/auth', { mode: 'signup', name: 'Duplicate', email: testEmail, password: 'TestPass123', branch: '' });

  // 3. Login with correct password
  console.log('--- 3. Login (correct password) ---');
  await post('/api/auth', { mode: 'login', email: testEmail, password: 'TestPass123' });

  // 4. Login with wrong password (should fail)
  console.log('--- 4. Login (wrong password, expect fail) ---');
  await post('/api/auth', { mode: 'login', email: testEmail, password: 'WrongPass' });

  // 5. Google auth
  console.log('--- 5. Google Auth ---');
  await post('/api/auth', { mode: 'google', email: 'google_test@example.com' });

  // 6. Contact form
  console.log('--- 6. Contact Form ---');
  await post('/api/contact', { name: 'Test Contact', email: 'contact@example.com', purpose: 'question', message: 'This is a test message from the live test script.' });

  // 7. Story contribution
  console.log('--- 7. Story Contribution ---');
  await post('/api/contribution', { title: 'Test Story Title', category: 'मौखिक इतिहास', story: 'This is a test story contribution to verify the backend is working correctly.' });

  // 8. Archive
  console.log('--- 8. Archive (all) ---');
  await post('/api/archive', { category: 'all' });

  // 9. Tree search
  console.log('--- 9. Tree Search ---');
  await post('/api/tree-search', { query: 'गोरखा' });

  console.log('=== ALL TESTS COMPLETE ===');
})();
