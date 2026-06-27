import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { saveLesson } from '../controllers/save/saveLesson.controller.js';
import { getMyFavoriteLessons } from '../controllers/save/getMyFavoriteLessons.controller.js';
import { deleteFavoriteLesson } from '../controllers/save/deleteFavoriteLesson.controller.js';

const savedRouter = Router();

savedRouter.post('/add', authMiddlewere, saveLesson);
savedRouter.get('/my-favorite', authMiddlewere, getMyFavoriteLessons);
savedRouter.delete('/delete/:lessonId', authMiddlewere, deleteFavoriteLesson);

export default savedRouter;
