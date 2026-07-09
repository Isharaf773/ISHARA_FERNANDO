import express from 'express';
import { loginUser, registerStudent } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerStudent);

export default router;

