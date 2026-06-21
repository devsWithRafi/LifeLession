import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addLike } from '../controllers/like/addLike.controller.js';


const likeRouter = Router();

likeRouter.post('/add', authMiddlewere, addLike);

export default likeRouter;
