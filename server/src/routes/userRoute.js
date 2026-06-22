import { Router } from 'express';
import { updateUserPlan } from '../controllers/user/updateUserPlan.controller.js';

const userRouter = Router();

userRouter.put('/update-plan/:userId', updateUserPlan);

export default userRouter;
