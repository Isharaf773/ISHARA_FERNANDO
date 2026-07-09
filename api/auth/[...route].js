import { createRouter } from '../../backend/lib/serverless.js';
import authRoutes from '../../backend/routes/authRoutes.js';

export default createRouter(authRoutes, '/api/auth');
