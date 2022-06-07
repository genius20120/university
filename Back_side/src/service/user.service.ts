import { users } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { loginRepository } from "../db/Repository/user.repository";
import { HttpException } from "../errorHandling/httpException";

export async function loginService(
  phone: string,
  code: string
): Promise<{ token: string; data: Partial<users> } | HttpException> {
  const user = await loginRepository(phone);
  if (user instanceof HttpException) return user;
  if (code == "123456") {
    const token = jwt.sign(user, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRED_TIME,
    });
    return {
      token,
      data: user,
    };
  }
  return new HttpException(403, "wrong codde entered");
}
