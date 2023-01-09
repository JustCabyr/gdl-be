import prisma from '../services/prisma';
import { Request, Response } from 'express';

export const userController = {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json(users);
  },

  async createUser(req: Request, res: Response) {
    const userData = req.body;

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
      },
    });
    return res.json({ user: user });
  },

  async findUser(req: Request, res: Response) {
    const paramId = req.params.id
    const user = await prisma.user.findUnique({
        where: {
            id: Number(paramId),
        }
      }  );
    return res.json(user);
  },
};
