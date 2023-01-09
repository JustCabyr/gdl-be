import { Router } from "express";
import { userController } from "../controlelrs/user.controller";

const userRoutes = Router();

userRoutes.get('/', userController.index);
userRoutes.post('/', userController.createUser);
userRoutes.get('/:id', userController.findUser);

export default userRoutes