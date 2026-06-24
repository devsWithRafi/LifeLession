import { Router } from 'express';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { addNewLesson } from '../controllers/lesson/addNewLesson.controller.js';
import { getAllLessons } from '../controllers/lesson/getAllLessons.controller.js';
import { getFeaturedLessons } from '../controllers/lesson/getFeaturedLessons.controller.js';
import { getSingleLesson } from '../controllers/lesson/getSingleLesson.controller.js';
import { getMyLessons } from '../controllers/lesson/getMyLessons.controller.js';
import { getTopContributors } from '../controllers/lesson/getTopContributors.controller.js';
import { getMostSavedLessons } from '../controllers/lesson/getMostSavedLessons.controller.js';
import { updateLesson } from '../controllers/lesson/updateLesson.controller.js';
import { deleteLesson } from '../controllers/lesson/deleteLesson.controller.js';

const lessonsRouter = Router();

lessonsRouter.post('/create', authMiddlewere, addNewLesson);
lessonsRouter.get('/all', getAllLessons);
lessonsRouter.get('/featured', getFeaturedLessons);
lessonsRouter.get('/my-lessons', authMiddlewere, getMyLessons);
lessonsRouter.get('/top-contributors', getTopContributors);
lessonsRouter.get('/most-saved', getMostSavedLessons);
lessonsRouter.get('/:id', authMiddlewere, getSingleLesson);
lessonsRouter.put('/update/:lessonId', authMiddlewere, updateLesson);
lessonsRouter.delete('/delete/:lessonId', authMiddlewere, deleteLesson);

export default lessonsRouter;
