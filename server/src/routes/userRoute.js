import { Router } from 'express';
import { updateUserPlan } from '../controllers/user/updateUserPlan.controller.js';
import { getUserLessonsSummary } from '../controllers/user/getUserLessonsSummary.js';
import { authMiddlewere } from '../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.put('/update-plan/:userId', updateUserPlan);
userRouter.get('/:userId', authMiddlewere, getUserLessonsSummary);

export default userRouter;
