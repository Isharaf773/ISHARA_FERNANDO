import express from 'express';
import { createMessage, getMessages, markAsRead } from '../controllers/contactController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', protect, adminOnly, getMessages);
router.put('/:id', protect, adminOnly, markAsRead);

export default router;

