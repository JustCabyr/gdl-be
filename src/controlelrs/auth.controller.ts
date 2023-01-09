import prisma from '../services/prisma';
import { Request, Response } from 'express';
import { BadRequestError, NoEntryError, NotFoundError } from '../core/ApiError';
import { SuccessResponse } from '../core/ApiResponse';
import asyncHandler from '../core/asyncHandler';
import * as bcrypt from 'bcrypt';

export const register = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!(email && password))
      throw new NotFoundError('Please provide email and password');

    const oldUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (oldUser) throw new BadRequestError('User Already Exist. Please Login');

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return new SuccessResponse('User logged in successfully', {
      user,
    }).send(res);
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password)
      throw new NotFoundError(
        'Please provide an email or username and password'
      );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new NoEntryError('User not found');

    if (!bcrypt.compareSync(password, user.password))
      throw new NotFoundError('Incorrect password, please try again');

    return new SuccessResponse('User logged in successfully', {
      user,
    }).send(res);
  }
);
