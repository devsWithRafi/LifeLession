import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { saveLesson } from '../controllers/save/saveLesson.controller.js';

const savedRouter = Router();

savedRouter.post('/add', authMiddlewere, saveLesson);

export default savedRouter;
