import { NextFunction, Request, Response } from "express";

export function deleteResponseHeadersSetForApp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  for (let local in res.locals) {
    res.locals[local] = null;
  }
}
/// remove local vars we set
