import { connectDB } from '../backend/lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    await connectDB();
    res.status(200).json({ status: 'OK', message: 'API is running' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
