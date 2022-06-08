import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../errorHandling/httpException";
import { LoginRequestValidate } from "../middleware/validateSchema/login.validator";
import { UserService } from "../service/user.service";

const userService = UserService;

export const loginRoute = Router();
loginRoute.post(
  "/login",
  [LoginRequestValidate],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.login(req.body.phone, req.body.code);
    if (result instanceof HttpException) return next(result);
    return res.status(200).send(result);
  }
);
