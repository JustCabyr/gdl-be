import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controlelrs/user.controller';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter
  .get('/:userId', getUser)
  .put('/:userId', updateUser)
  .delete('/:userId', deleteUser);

export default userRouter;
