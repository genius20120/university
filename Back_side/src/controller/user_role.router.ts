import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../errorHandling/httpException";
import { insertUserRequestValidator } from "../middleware/validateSchema/insert_user.validator";
import { LoginRequestValidate } from "../middleware/validateSchema/login.validator";
import { loginService } from "../service/user.service";
import { Client as minioClient } from "minio";
import { uploadImageMiddleware } from "../middleware/upload/image";
import { insertRoleValidator } from "../middleware/validateSchema/insert_role.validator";
import { RoleService } from "../service/role.service";

export const userRoute = Router();
export const roleRoute = Router();
const roleService = new RoleService();

userRoute.post(
  "/testUpload",
  uploadImageMiddleware.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    const newClient = await new minioClient({
      endPoint: "localhost",
      port: 9000,
      useSSL: false,
      accessKey: "minioadmin",
      secretKey: "minioadmin",
    });
    console.log(await newClient.listBuckets());

    const file = req.file;
    if (!file) return new HttpException(400, "file not exist");
    try {
      const result = await newClient.putObject(
        "test",
        "test_image1",
        file.buffer
      );
      const imageUrl = await newClient.presignedUrl(
        "get",
        "test",
        "test_image1"
      );
      res.send(imageUrl);
    } catch (e) {
      console.log(e);
      return;
    }
  }
);
userRoute.post(
  "/insert/student",
  [insertUserRequestValidator],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await loginService(req.body.phone, req.body.code);
    if (result instanceof HttpException) return next(result);
    return res.status(200).send(result);
  }
);
userRoute.post(
  "/insert/professor",
  [insertUserRequestValidator],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await loginService(req.body.phone, req.body.code);
    if (result instanceof HttpException) return next(result);
    return res.status(200).send(result);
  }
);
roleRoute.post(
  "/insert",
  [insertRoleValidator],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await roleService.insertRole(req.body);
    if (result instanceof HttpException) return next(result);
    return res.status(201).send(result);
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
  "/getAll",
  [],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await loginService(req.body.phone, req.body.code);
    if (result instanceof HttpException) return next(result);
    return res.status(200).send(result);
  }
);
