import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

export class HttpException extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super();
    this.status = status;
    if (message) this.message = message;
  }
}
export function ErrorHandlingMiddleware(
  error: HttpException | MulterError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof MulterError) response.status(400).send(error.message);
  else response.status(error.status).send(error.message);
}
