import { users } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { UserRepository } from "../db/Repository/user.repository";
import { HttpException } from "../errorHandling/httpException";
import { InsertUserDto } from "../model/user.dto";
import { MinioClient } from "./image.service";

class User {
  private readonly userRepository;
  private readonly imageService;
  constructor() {
    this.userRepository = UserRepository;
    this.imageService = MinioClient;
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
        const imageUrl = await this.imageService.generateLink(user.photo);
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
    try {
      const users = await this.userRepository.getAllNotActiveUsers(page, size);
      for (let user of users.user) {
        if (user.photo) {
          const photoUrl = await this.imageService.generateLink(user.photo);
          user.photo = photoUrl;
        }
      }
      return users;
    } catch (e) {
      throw e;
    }
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
  async searchUser(
    filter: { first_name?: string; last_name?: string; personal_id?: number },
    page: number,
    size: number,
    user_id: number
  ) {
    try {
      const res = await this.userRepository.searchUser(
        filter,
        page,
        size,
        user_id
      );
      for (let user of res.data) {
        if (user.photo)
          user.photo = await this.imageService.generateLink(user.photo);
      }
      return res;
    } catch (e) {
      throw e;
    }
  }
  async searchSupervisorUser(
    filter: { first_name?: string; last_name?: string; personal_id?: number },
    user_id: number,
    project_id: number
  ) {
    try {
      const res = await this.userRepository.searchSupervisorUser(
        filter,
        user_id,
        project_id
      );
      for (let user of res) {
        if (user.photo)
          user.photo = await this.imageService.generateLink(user.photo);
      }
      return res;
    } catch (e) {
      throw e;
    }
  }
}
export const UserService = new User();
