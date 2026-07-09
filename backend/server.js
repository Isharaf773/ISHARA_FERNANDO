import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import authRoutes from './routes/authRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
// seedRoutes removed for security in production
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import User from './models/User.js';
import { connectDB } from './lib/db.js';

// Load env vars
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB()
  .then(async () => {
    console.log('MongoDB connected successfully');

    // Ensure admin user exists on startup
    const adminUsername = 'ISHARAF773';
    const adminEmail = 'isharaf773@gmail.com';
    const adminPassword = 'Ishara@1234';
    const existingAdmin = await User.findOne({ username: adminUsername });
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    if (existingAdmin) {
      if (existingAdmin.role !== 'admin' || existingAdmin.email !== adminEmail) {
        existingAdmin.role = 'admin';
        existingAdmin.email = adminEmail;
        existingAdmin.password = hashedPassword;
        await existingAdmin.save();
        console.log('Updated existing admin user.');
      }
    } else {
      await User.create({ username: adminUsername, email: adminEmail, password: hashedPassword, role: 'admin' });
      console.log('Created admin user.');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactRoutes);
// remove /api/seed route (temporary seeder removed for security)

// 404 handler
app.use(notFound);

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
export default app;
