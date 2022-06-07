import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errorHandling/httpException";

import * as jwt from "jsonwebtoken";
import { indexOf } from "lodash";
import config from "../config/config";

export function authenticateUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.headers["authorization"];
    if (token) {
      // here used bearer authentication so i slice to 7
      const userInfo = jwt.verify(token?.slice(7), config.JWT_SECRET);
      response.locals.user = userInfo;
      next();
    } else next(new HttpException(403, "unauthorized"));
  } catch (e) {
    console.log(e);
    next(new HttpException(403, "unauthorized"));
  }
}
