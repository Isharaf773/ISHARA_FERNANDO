import express from 'express';
import { getLessons, getLessonById, createLesson, updateLesson, deleteLesson, getAdminLessons } from '../controllers/lessonController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getLessons);
router.get('/admin', protect, adminOnly, getAdminLessons);
router.get('/:id', getLessonById);
router.post('/', protect, adminOnly, createLesson);
router.put('/:id', protect, adminOnly, updateLesson);
router.delete('/:id', protect, adminOnly, deleteLesson);

export default router;

