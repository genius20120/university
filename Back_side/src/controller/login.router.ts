import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../errorHandling/httpException";
import { LoginRequestValidate } from "../middleware/validateSchema/login.validator";
import { loginService } from "../service/user.service";

export const loginRoute = Router();
loginRoute.post(
  "/login",
  [LoginRequestValidate],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await loginService(req.body.phone, req.body.code);
    if (result instanceof HttpException) return next(result);
    return res.status(200).send(result);
  }
);
