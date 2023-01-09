import prisma from '../services/prisma';
import { Request, Response } from 'express';
import { NoEntryError } from '../core/ApiError';
import { SuccessResponse } from '../core/ApiResponse';
import asyncHandler from '../core/asyncHandler';

export const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user) throw new NoEntryError('User not found');

    return new SuccessResponse('User profile', user).send(res);
  }
);

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.userId;

    const users = await prisma.user.findMany();

    return new SuccessResponse('All users', users).send(res);
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.userId;
    const { email, password, fullname } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new NoEntryError('User not found');

    await prisma.user.update({
      data: {
        email,
        fullname,
      },
      where: {
        id: Number(userId),
      },
    });

    user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return new SuccessResponse('User updated successfully!', user).send(res);
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user) throw new NoEntryError('User not found');

    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    return new SuccessResponse('User deleted!', user).send(res);
  }
);
