import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addComment } from '../controllers/lesson/addComment.controller.js';


const commentRouter = Router();

commentRouter.post('/create', authMiddlewere, addComment);

export default commentRouter;
