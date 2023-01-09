import { Response } from 'express';
import {
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
} from './ApiResponse';

enum ErrorType {
  NOT_FOUND = 'NotFoundError',
  INTERNAL = 'InternalError',
  BAD_REQUEST = 'BadRequestError',
  NO_ENTRY = 'NoEntryError',
}

export abstract class ApiError extends Error {
  // eslint-disable-next-line
  constructor(
    public type: ErrorType,
    public message: string = 'error',
    protected data?: any
  ) {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      default: {
        let message = err.message;
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal Error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}
