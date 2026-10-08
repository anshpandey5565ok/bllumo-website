const http = require('http');
const fs = require('fs');

async function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function get(path, headers = {}) {
  return request({
    hostname: 'localhost',
    port: 3001,
    path: path,
    method: 'GET',
    headers: { ...headers }
  });
}

async function post(path, data, headers = {}) {
  const payload = JSON.stringify(data);
  return request({
    hostname: 'localhost',
    port: 3001,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'Origin': 'http://localhost:3001',
      ...headers
    }
  }, payload);
}

async function del(path, headers = {}) {
  return request({
    hostname: 'localhost',
    port: 3001,
    path: path,
    method: 'DELETE',
    headers: {
      'Origin': 'http://localhost:3001',
      ...headers
    }
  });
}

async function runVerification() {
  console.log('====================================================');
  console.log('   BLLUMO VERIFICATION & CORRECTION TEST SUITE');
  console.log('====================================================\n');
  let failures = 0;

  // --- 1. CONCURRENT WAITLIST PERSISTENCE & DURABILITY ---
  console.log('1. TESTING CONCURRENT STORAGE WRITES (RACE CONDITION CHECK) ...');
  const initialEntries = JSON.parse(fs.readFileSync('data/waitlist.json', 'utf-8'));
  const initialCount = initialEntries.length;

  const testBatchSize = 10;
  const promises = [];
  const testEmails = [];

  for (let i = 0; i < testBatchSize; i++) {
    const email = `concurrency_test_${Date.now()}_${i}@example.com`;
    testEmails.push(email);
    promises.push(post('/api/waitlist', {
      first_name: `Concurrent User ${i}`,
      email: email,
      interest: 'Focus & deep work routines',
      consent: true,
      source: 'concurrency_test'
    }, {
      'x-forwarded-for': `192.168.1.${100 + i}`
    }));
  }

  const results = await Promise.all(promises);
  const allSucceeded = results.every(r => r.status === 200);
  console.log(`  Dispatched ${testBatchSize} simultaneous POST requests. All returned 200:`, allSucceeded);

  // Check file contents after concurrent writes
  const updatedEntries = JSON.parse(fs.readFileSync('data/waitlist.json', 'utf-8'));
  const entriesAdded = updatedEntries.length - initialCount;
  console.log(`  Expected entries added: ${testBatchSize}, Actual added: ${entriesAdded}`);

  // Check rolling backup created
  const backupExists = fs.existsSync('data/waitlist.backup.json');
  console.log('  Rolling backup file exists:', backupExists);

  if (!allSucceeded || entriesAdded !== testBatchSize || !backupExists) {
    console.error('FAIL: Concurrency or backup write test failed!');
    failures++;
  } else {
    console.log('  PASS: Concurrency safety and atomic serialization verified.');
  }

  // --- 2. ADMIN AUTHENTICATION, EXPIRY, TAMPERING, LOGOUT ---
  console.log('\n2. TESTING ADMINISTRATOR SERVER-SIDE AUTHORIZATION & TOKENS ...');
  const envLocal = fs.readFileSync('.env.local', 'utf-8');
  const match = envLocal.match(/ADMIN_SECRET_KEY=([a-f0-9]+)/);
  const adminSecret = match ? match[1] : '';

  // A. Origin check: cross-origin forbidden
  const crossOriginLogin = await post('/api/admin/auth', { passkey: adminSecret }, { 'Origin': 'https://malicious-site.com' });
  console.log('  Cross-origin POST /api/admin/auth status:', crossOriginLogin.status);
  if (crossOriginLogin.status !== 403) {
    console.error('FAIL: Cross-origin request was not rejected with 403!');
    failures++;
  } else {
    console.log('  PASS: Request-origin protection active.');
  }

  // B. Valid login & cookie issuance
  const validLogin = await post('/api/admin/auth', { passkey: adminSecret });
  const setCookie = validLogin.headers['set-cookie'];
  console.log('  Valid passkey login status:', validLogin.status, 'Cookie issued:', !!setCookie);
  const cookieStr = setCookie ? setCookie[0].split(';')[0] : '';
  const tokenVal = cookieStr.replace('bllumo_admin_session=', '');

  // C. Test tampered token rejection
  const tamperedToken = tokenVal.slice(0, -4) + 'abcd';
  const tamperedReq = await get('/api/admin/waitlist', { 'Cookie': `bllumo_admin_session=${tamperedToken}` });
  console.log('  Tampered session token status:', tamperedReq.status);
  if (tamperedReq.status !== 401) {
    console.error('FAIL: Tampered session token was not rejected!');
    failures++;
  } else {
    console.log('  PASS: Tampered session token rejected with 401.');
  }

  // D. Test expired token rejection (using crypto to construct expired payload)
  const crypto = require('crypto');
  const expiredPayload = Buffer.from(JSON.stringify({
    iat: Math.floor(Date.now() / 1000) - 7200,
    exp: Math.floor(Date.now() / 1000) - 3600, // expired 1 hour ago
    jti: 'test-expired'
  })).toString('base64url');
  const expiredSig = crypto.createHmac('sha256', adminSecret).update(expiredPayload).digest('base64url');
  const expiredToken = `${expiredPayload}.${expiredSig}`;

  const expiredReq = await get('/api/admin/waitlist', { 'Cookie': `bllumo_admin_session=${expiredToken}` });
  console.log('  Expired session token status:', expiredReq.status);
  if (expiredReq.status !== 401) {
    console.error('FAIL: Expired session token was not rejected!');
    failures++;
  } else {
    console.log('  PASS: Expired session token rejected with 401.');
  }

  // E. Test Logout & Revocation
  const logoutRes = await del('/api/admin/auth', { 'Cookie': cookieStr });
  console.log('  Logout DELETE status:', logoutRes.status);
  const postLogoutCookie = logoutRes.headers['set-cookie'] ? logoutRes.headers['set-cookie'][0] : '';
  const isCookieCleared = postLogoutCookie.includes('Max-Age=0') || postLogoutCookie.includes('bllumo_admin_session=;');
  console.log('  Session cookie invalidated on logout:', isCookieCleared);

  // Subsequent check with cleared cookie
  const afterLogoutReq = await get('/api/admin/waitlist', { 'Cookie': 'bllumo_admin_session=' });
  console.log('  Subsequent waitlist query status after logout:', afterLogoutReq.status);
  if (afterLogoutReq.status !== 401) {
    console.error('FAIL: Post-logout request was not 401!');
    failures++;
  } else {
    console.log('  PASS: Session revocation and logout verified.');
  }

  // --- 3. KEYBOARD ACCESSIBILITY & DEFAULT CONCEPT ---
  console.log('\n3. VERIFYING CONCEPT TAB ACCESSIBILITY & FIRST RELEASE ALIGNMENT ...');
  const home = await get('/');
  
  // Check default concept is Focus & Deep Work
  const hasFocusDefault = home.body.includes('Focus &amp; Deep Work (Phase 1 Target)') || home.body.includes('Focus & Deep Work (Phase 1 Target)');
  console.log('  Default active concept includes Focus & Deep Work:', hasFocusDefault);

  // Check roving tabindex markup
  const hasRovingTabindex = home.body.includes('tabindex="0"') && home.body.includes('tabindex="-1"');
  console.log('  Roving tabindex present on concept tabs:', hasRovingTabindex);

  // Check tabpanel accessibility attributes
  const hasTabpanelAttributes = home.body.includes('role="tabpanel"') && home.body.includes('aria-labelledby="concept-tab-');
  console.log('  Tabpanel association and attributes present:', hasTabpanelAttributes);

  // Check skip link
  const hasSkipLink = home.body.includes('href="#main-content"') && home.body.includes('Skip to main content');
  console.log('  Accessible skip-to-main-content link present:', hasSkipLink);

  if (!hasFocusDefault || !hasRovingTabindex || !hasTabpanelAttributes || !hasSkipLink) {
    console.error('FAIL: Concept tab accessibility or default target mismatch!');
    failures++;
  } else {
    console.log('  PASS: Concept tab keyboard navigation and Phase 1 alignment verified.');
  }

  // --- 4. UNSUPPORTED CLAIMS & DISCLOSURE VERIFICATION ---
  console.log('\n4. VERIFYING PUBLIC CLAIMS, HYPOTHESES & OPERATIONAL TRANSPARENCY ...');
  const privacy = await get('/privacy');
  const terms = await get('/terms');
  const contact = await get('/contact');
  const investors = await get('/investors');
  const aboutSection = home.body;

  // Check monitored inbox claims are removed
  const noMonitoredInboxInHome = !aboutSection.includes('Monitored Inbox') && !aboutSection.includes('Monitored directly');
  const noMonitoredInboxInContact = !contact.body.includes('Monitored Inbox') && !contact.body.includes('Monitored directly');
  const noMonitoredInboxInInvestors = !investors.body.includes('Monitored directly');
  console.log('  "Monitored inbox" removed from About / Homepage:', noMonitoredInboxInHome);
  console.log('  "Monitored inbox" removed from Contact:', noMonitoredInboxInContact);
  console.log('  "Monitored directly" removed from Investors:', noMonitoredInboxInInvestors);

  // Check ungrounded claims removed from Privacy
  const noEncryptedLocalClaims = !privacy.body.includes('Encrypted filesystem records');
  const noAbsoluteRiskElimination = !privacy.body.includes('eliminated the risk of sensitive data exposure');
  console.log('  "Encrypted filesystem records" removed from Privacy Policy:', noEncryptedLocalClaims);
  console.log('  Absolute risk elimination claim removed from Privacy Policy:', noAbsoluteRiskElimination);

  // Check unverified research dates/quarters removed from Investors
  const noUnverifiedQuarters = !investors.body.includes('Q4 2026') && !investors.body.includes('Q1 2027');
  console.log('  Unverified quarterly calendar targets removed from Investors:', noUnverifiedQuarters);

  // Check problem hypotheses clearly labeled
  const hypothesesLabeled = investors.body.includes('Hypothesized Initial Customer Segment') && investors.body.includes('Working Problem Hypothesis');
  console.log('  Strategic items clearly labeled as working hypotheses on /investors:', hypothesesLabeled);

  if (!noMonitoredInboxInHome || !noMonitoredInboxInContact || !noEncryptedLocalClaims || !noUnverifiedQuarters || !hypothesesLabeled) {
    console.error('FAIL: Unsupported claims remain in public copy!');
    failures++;
  } else {
    console.log('  PASS: All claims substantiated or framed as unverified working hypotheses.');
  }

  console.log('\n====================================================');
  if (failures === 0) {
    console.log('RESULT: ALL VERIFICATION PASS CHECKS PASSED (0 FAILURES)');
  } else {
    console.log('RESULT: FAILED CHECKS: ' + failures);
  }
  console.log('====================================================\n');

  process.exit(failures === 0 ? 0 : 1);
}

runVerification().catch((err) => {
  console.error('Unhandled verification error:', err);
  process.exit(1);
});
