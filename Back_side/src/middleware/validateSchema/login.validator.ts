import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpException } from "../../errorHandling/httpException";

const LogInSchema = Joi.object({
  phone: Joi.number(),
  code: Joi.string().max(6),
});
export const LoginRequestValidate = (
  request: Request,
  resopone: Response,
  next: NextFunction
) => {
  const res = LogInSchema.validate(request.body);
  if (res.error)
    return next(new HttpException(400, res.error.details[0].message));
  next();
};
