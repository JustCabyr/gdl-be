import { Router } from 'express';

import { register, login } from '../controlelrs/auth.controller';

const authRouter = Router();

authRouter.post('/', register);
authRouter.post('/login', login);

export default authRouter;
