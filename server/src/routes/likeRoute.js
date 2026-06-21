import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addLike } from '../controllers/like/addLike.controller.js';
import { getLike } from '../controllers/like/getLike.controller.js';

const likeRouter = Router();

likeRouter.post('/add', authMiddlewere, addLike);
likeRouter.get('/:lessonId', authMiddlewere, getLike);

export default likeRouter;
