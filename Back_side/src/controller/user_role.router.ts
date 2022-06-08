import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../errorHandling/httpException";
import {
  insertEmpValidator,
  insertProfsValidator,
  insertStudentValidator,
} from "../middleware/validateSchema/insert_user.validator";
import { LoginRequestValidate } from "../middleware/validateSchema/login.validator";
import { uploadImageMiddleware } from "../middleware/upload/image";
import { insertRoleValidator } from "../middleware/validateSchema/insert_role.validator";
import { RoleService } from "../service/role.service";
import { MinioClient } from "../service/image.service";
import { UserService } from "../service/user.service";
import { authenticateUser } from "../middleware/authentication";

export const userRoute = Router();
export const roleRoute = Router();
const minioClient = MinioClient;
const roleService = new RoleService();
const userService = UserService;

userRoute.post(
  "/insert/student",
  [
    authenticateUser("inserting_student"),
    insertStudentValidator,
    uploadImageMiddleware.single("file"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      let photo;
      if (file) {
        photo = `${file.originalname}${new Date().getTime()}`;
        const isPhotoUpload = await minioClient.uploadPhoto(photo, file);
        if (isPhotoUpload instanceof HttpException) return isPhotoUpload;
      }

      const result = await userService.insert(
        { photo, ...req.body, active: false },
        res.locals.user.id
      );

      if (result instanceof HttpException) return next(result);
      return res.status(200).send("done");
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
userRoute.post(
  "/insert/emp",
  [
    authenticateUser("inserting_emp"),
    insertEmpValidator,
    uploadImageMiddleware.single("file"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      let photo;
      if (file) {
        photo = `${file.originalname}${new Date().getTime()}`;
        const isPhotoUpload = await minioClient.uploadPhoto(photo, file);
        if (isPhotoUpload instanceof HttpException) return isPhotoUpload;
      }

      const result = await userService.insert(
        { photo, ...req.body },
        res.locals.user.id
      );
      if (result instanceof HttpException) return next(result);
      return res.status(200).send("done");
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
userRoute.post(
  "/insert/profs",
  [
    authenticateUser("inserting_prof"),
    insertProfsValidator,
    uploadImageMiddleware.single("file"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      let photo;
      if (file) {
        photo = `${file.originalname}${new Date().getTime()}`;
        const isPhotoUpload = await minioClient.uploadPhoto(photo, file);
        if (isPhotoUpload instanceof HttpException) return isPhotoUpload;
      }

      const result = await userService.insert(
        { photo, ...req.body },
        res.locals.user.id
      );
      if (result instanceof HttpException) return next(result);
      return res.status(200).send("done");
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
roleRoute.post(
  "/insert",
  [authenticateUser("inserting_roles_permisions"), insertRoleValidator],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await roleService.insertRole(req.body);
      res.locals.user = null;
      return res.status(201).send(result);
    } catch (e) {
      return next(e);
    }
  }
);
roleRoute.get(
  "/getAll",
  [],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await roleService.getAllRoles();
    if (result instanceof HttpException) return next(result);
    return res.status(200).send(result);
  }
);
roleRoute.get(
  "/permision/getAll",
  [],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await roleService.getAllPermisions();
    if (result instanceof HttpException) return next(result);
    return res.status(200).send(result);
  }
);
userRoute.get(
  "/notActive/getAll",
  [],
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("its inserts");

    const result = await userService.getAllNotActive(1, 20);
    if (result instanceof HttpException) return next(result);
    return res.status(200).send(result);
  }
);
