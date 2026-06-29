import { Router } from 'express';
import { updateUserPlan } from '../controllers/user/updateUserPlan.controller.js';
import { getUserLessonsSummary } from '../controllers/user/getUserLessonsSummary.js';
import { authMiddlewere } from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controllers/user/getAllUsers.controller.js';
import { deleteUser } from '../controllers/user/deleteUser.controller.js';
import { promoteUser } from '../controllers/user/promoteUser.controller.js';
import { getUserDashboardData } from '../controllers/user/getUserDashboardData.js';

const userRouter = Router();

userRouter.put('/update-plan/:userId', updateUserPlan);
userRouter.patch('/promote/:userId', authMiddlewere, promoteUser);
userRouter.get('/all', authMiddlewere, getAllUsers);
userRouter.get('/dashboard', authMiddlewere, getUserDashboardData);
userRouter.delete('/delete/:userId', authMiddlewere, deleteUser);
userRouter.get('/:userId', authMiddlewere, getUserLessonsSummary);

export default userRouter;
