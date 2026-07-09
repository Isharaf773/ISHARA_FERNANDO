import { createRouter } from '../../backend/lib/serverless.js';
import lessonRoutes from '../../backend/routes/lessonRoutes.js';

export default createRouter(lessonRoutes, '/api/lessons');
