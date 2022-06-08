import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { deleteResponseHeadersSetForApp } from "../middleware/deleteResponeHeaers";

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
  if (error instanceof MulterError)
    response.status(400).send({ message: error.message });
  else response.status(error.status).send({ message: error.message });
}
