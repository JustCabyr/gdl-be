import express, { Request, Response, NextFunction } from 'express';
import { ApiError, InternalError, NotFoundError } from './core/ApiError';
import { userRoutes } from './routes';

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.notfounderror();
    this.errorhandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/api/users', userRoutes);
  }

  notfounderror() {
    this.server.use((req, res, next) => next(new NotFoundError()));
  }

  errorhandler() {
    this.server.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
          ApiError.handle(err, res);
        } else {
          ApiError.handle(new InternalError(), res);
        }
      }
    );
  }
}

export default new App().server;
