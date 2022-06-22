import { users } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { UserRepository } from "../db/Repository/user.repository";
import { HttpException } from "../errorHandling/httpException";
import { InsertUserDto } from "../model/user.dto";
import { MinioClient } from "./image.service";

class User {
  private readonly userRepository;
  constructor() {
    this.userRepository = UserRepository;
  }
  async login(
    phone: string,
    code: string
  ): Promise<{ token: string; data: Partial<users> } | HttpException> {
    const user = await this.userRepository.login(phone);
    if (user instanceof HttpException) return user;
    if (code == "123456") {
      const token = jwt.sign(user, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRED_TIME,
      });
      if (user.photo) {
        const imageUrl = await MinioClient.generateLink(user.photo);
        if (imageUrl instanceof HttpException) return imageUrl;
        user.photo = imageUrl;
      }
      return {
        token,
        data: user,
      };
    }
    return new HttpException(403, "wrong codde entered");
  }
  async insert(data: Omit<InsertUserDto, "assigned_by">, assigned_by: number) {
    return await this.userRepository.insert({ assigned_by, ...data });
  }
  async getAllNotActive(page: number, size: number) {
    const users = await this.userRepository.getAllNotActiveUsers(page, size);
    for (let user of users.user) {
      if (user.photo) {
        const photoUrl = await MinioClient.generateLink(user.photo);
        if (photoUrl instanceof HttpException) return photoUrl;
        user.photo = photoUrl;
      }
    }
    return users;
  }
  async insertField(data: { name: string }) {
    return await this.userRepository.insertField(data);
  }
  async getAllField() {
    return await this.userRepository.getAllField();
  }
  async acceptStudent(id: number) {
    return await this.userRepository.acceptStudent(id);
  }
}
export const UserService = new User();
