import { Router } from 'express';
import { updateUserPlan } from '../controllers/user/updateUserPlan.controller.js';
import { getUserLessonsSummary } from '../controllers/user/getUserLessonsSummary.js';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controllers/user/getAllUsers.controller.js';
import { deleteUser } from '../controllers/user/deleteUser.controller.js';
import { promoteUser } from '../controllers/user/promoteUser.controller.js';

const userRouter = Router();

userRouter.put('/update-plan/:userId', updateUserPlan);
userRouter.patch('/promote/:userId', authMiddlewere, promoteUser);
userRouter.get('/all', authMiddlewere, getAllUsers);
userRouter.get('/:userId', authMiddlewere, getUserLessonsSummary);
userRouter.delete('/delete/:userId', authMiddlewere, deleteUser);

export default userRouter;
