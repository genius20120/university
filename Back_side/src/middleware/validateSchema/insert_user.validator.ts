import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpException } from "../../errorHandling/httpException";

const userBase = {
  first_name: Joi.string().max(50),
  last_name: Joi.string().max(50),
  phone: Joi.string().max(50),
  national_id: Joi.number(),
  personal_id: Joi.number(),
  birthday: Joi.date(),
  entery_year: Joi.number().integer(),
  role_ids: Joi.array().items(Joi.number().integer()),
};
const empSchema = Joi.object({ ...userBase });
const profsSchema = Joi.object({ ...userBase, field_id: Joi.number().integer });
const studentSchema = Joi.object({
  ...userBase,
  field_id: Joi.number().integer(),
});
export const insertEmpValidator = (
  request: Request,
  resopone: Response,
  next: NextFunction
) => {
  const res = empSchema.validate(request.body);
  if (res.error)
    return next(new HttpException(400, res.error.details[0].message));
  next();
};
export const insertProfsValidator = (
  request: Request,
  resopone: Response,
  next: NextFunction
) => {
  const res = profsSchema.validate(request.body);
  if (res.error)
    return next(new HttpException(400, res.error.details[0].message));
  next();
};
export const insertStudentValidator = (
  request: Request,
  resopone: Response,
  next: NextFunction
) => {
  const res = studentSchema.validate(request.body);
  if (res.error)
    return next(new HttpException(400, res.error.details[0].message));
  next();
};
