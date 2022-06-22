import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errorHandling/httpException";

import * as jwt from "jsonwebtoken";
import config from "../config/config";

export function authenticateUser(role_key: string) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.headers["authorization"];
      if (token) {
        // here used bearer authentication so i slice to 7
        const userInfo = jwt.verify(token?.slice(7), config.JWT_SECRET);
        if (typeof userInfo != "string") {
          let isPermitted = false;
          userInfo.roles_of_users.forEach(
            (roles: {
              role: { permisions_of_roles: { permision: { key: string } }[] };
            }) => {
              roles.role.permisions_of_roles.forEach((permision) => {
                if (permision.permision.key == role_key) isPermitted = true;
              });
            }
          );
          if (!isPermitted) next(new HttpException(403, "unauthorized"));
          response.locals.user = userInfo;
          return next();
        }

        return next(new HttpException(403, "unauthorized"));
      } else next(new HttpException(403, "unauthorized"));
    } catch (e) {
      console.log(e);
      return next(new HttpException(403, "unauthorized"));
    }
  };
}
