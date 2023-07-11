import { Request, NextFunction, Response } from 'express';
import { UrlNotFoundException } from './exceptions';

export function NotFound(req: Request, res: Response, next: NextFunction): void {
    console.log(`url: ${req.url}$ not found...`);
    next(new UrlNotFoundException(req.url));
  }