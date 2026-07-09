import { createRouter } from '../../backend/lib/serverless.js';
import contactRoutes from '../../backend/routes/contactRoutes.js';

export default createRouter(contactRoutes, '/api/contact');
