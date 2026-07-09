import { createRouter } from '../../backend/lib/serverless.js';
import categoryRoutes from '../../backend/routes/categoryRoutes.js';

export default createRouter(categoryRoutes, '/api/categories');
