const url = 'https://ishara-fernando-tutor.vercel.app/api/auth/register';
const payload = {
  username: 'testuser' + Math.floor(Math.random() * 10000),
  email: 'test@example.com',
  password: 'password123'
};

async function test() {
  try {
    console.log('Sending POST to:', url);
    console.log('Payload:', payload);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('SUCCESS:', res.status, data);
  } catch (error) {
    console.error('FAILURE:', error.message);
  }
}

test();
