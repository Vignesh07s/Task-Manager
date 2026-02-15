import express from 'express';
import { protect } from '../middleware/auth.midleware.js';
import { createTask, editTask, getTasks, markAsCompleted, deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

router.use(protect);

router.post('/create', createTask);
router.get('/', getTasks);
router.patch('/:id', editTask);
router.patch('/:id/mark-as-completed', markAsCompleted);
router.delete('/:id', deleteTask);

export default router;