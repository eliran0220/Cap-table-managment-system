import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpException } from './exceptions';

type AsyncReqHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default function errorWrapper(routingFunc: AsyncReqHandler | RequestHandler):AsyncReqHandler {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await routingFunc(req, res, next);
    } catch (err) {
        console.log("cought at error wrapper")
      next(err);
    }
  };
}

export function ErrorResponse(err: HttpException,req: Request,res: Response,next: NextFunction,): void {
  const response = {
    status: err.statusCode || 500,
    message: err.message,
    stack: err.stack || 'No trace stack.',
  };
  next();
  res.status(response.status).json(response);
}