import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpException } from "../../errorHandling/httpException";

const userSchema = Joi.object({
  first_name: Joi.string().max(50),
  last_name: Joi.string().max(50),
  phone: Joi.string().max(50),
  national_id: Joi.number(),
  personal_id: Joi.number(),
  birthday: Joi.date(),
  entery_year: Joi.number().integer(),
  study_field: Joi.string().max(50),
  role_id: Joi.array().items(Joi.number().integer()),
});
export const insertUserRequestValidator = (
  request: Request,
  resopone: Response,
  next: NextFunction
) => {
  const res = userSchema.validate(request.body);
  if (res.error)
    return next(new HttpException(400, res.error.details[0].message));
  next();
};
