import { NextFunction, Request, Response } from "express";

export function deleteResponseHeadersSetForApp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!res.locals) return next();
  for (let local in res.locals) {
    res.locals[local] = null;
  }
  return next();
}
/// remove local vars we set
