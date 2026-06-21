import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addComment } from '../controllers/comment/addComment.controller.js';
import { getComment } from '../controllers/comment/getComment.controller.js';

const commentRouter = Router();

commentRouter.post('/create', authMiddlewere, addComment);
commentRouter.get('/:lessonId', authMiddlewere, getComment);

export default commentRouter;
