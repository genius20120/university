import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../errorHandling/httpException";
import { authenticateUser } from "../middleware/authentication";
import { uploadFileMiddleware } from "../middleware/upload/image";
import { MinioClient } from "../service/image.service";
import { ProjectService } from "../service/project.service";

export const projectRoute = Router();
const projectService = ProjectService;
const minioClient = MinioClient;
projectRoute.get(
  "/getStatus",
  [authenticateUser("student_project")],
  async (req: Request, response: Response, next: NextFunction) => {
    try {
      const res = await projectService.getProjectStatus(
        response.locals.user.id
      );
      return response.status(200).send(res);
    } catch (e) {
      throw e;
    }
  }
);
projectRoute.get(
  "/helperList",
  [authenticateUser("student_project")],
  async (req: Request, response: Response, next: NextFunction) => {
    try {
      const res = await projectService.helperList(response.locals.user.id);
      return response.status(200).send(res);
    } catch (e) {
      throw e;
    }
  }
);
projectRoute.post(
  "/requestProject",
  [authenticateUser("student_project"), uploadFileMiddleware.single("file")],
  async (req: Request, response: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) return next(new HttpException(400, "file didnt upload"));
      let file_name;
      file_name = `${file.originalname}${new Date().getTime()}`;
      await minioClient.uploadPhoto(file_name, file);
      const res = await projectService.choosingHelper({
        user_id: +response.locals.user.id,
        file_url: file_name,
        description: req.body.description,
        helper_id: +req.body.helper_id,
      });
      return response.status(200).send(res);
    } catch (e) {
      return next(e);
    }
  }
);
projectRoute.get(
  "/getHelperProjects",
  [authenticateUser("helper_operations")],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await projectService.getHelperProjects(res.locals.user.id);
      return res.status(200).send(result);
    } catch (e) {
      return next(e);
    }
  }
);
projectRoute.get(
  "/getProjectDetail/:projectId",
  [authenticateUser("helper_operations")],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("its here");
      const result = await projectService.getProjectDetails(
        res.locals.user.id,
        +req.params["projectId"]
      );
      //
      return res.status(200).send(result);
    } catch (e) {
      return next(e);
    }
  }
);
projectRoute.post(
  "/helperChangeStatus",
  [authenticateUser("helper_operations")],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await projectService.statusChangeByHelper(
        +res.locals.user.id,
        {
          project_id: +req.body.project_id,
          status: req.body.status,
        }
      );
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }
);
projectRoute.get(
  "/getProjectSupervisorNeed",
  [authenticateUser("assign_project_supervisors")],
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await projectService.getProjectSupervisorNeed(
      +res.locals.user.id
    );
    return res.status(200).send(result);
  }
);
projectRoute.post(
  "/insertSupervisor",
  [authenticateUser("assign_project_supervisors")],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = {
        project_id: +req.body.project_id,
        supervisor: req.body.supervisor.map(
          (superd: { user_id: number; role_id: number }) => {
            return { user_id: +superd.user_id, role_id: +superd.role_id };
          }
        ),
      };
      const result = await projectService.insertSupervisor(data);
      return res.status(200).send({ message: "done" });
    } catch (e) {
      throw next(e);
    }
  }
);
projectRoute.get(
  "/hasNewNotification",
  [authenticateUser()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await projectService.hasNewNotification(
        +res.locals.user.id
      );
    } catch (e) {
      return next(e);
    }
  }
);
projectRoute.get(
  "/getProjectReport/:project_id",
  [authenticateUser()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await projectService.getProjectReports(
        +req.params["project_id"]
      );
      return res.status(200).send(result);
    } catch (e) {
      return next(e);
    }
  }
);
projectRoute.get(
  "/getProjectReportForStudent",
  [authenticateUser()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await projectService.getProjectReportsForStudent(
        +res.locals.user.id
      );
      return res.status(200).send(result);
    } catch (e) {
      return next(e);
    }
  }
);
projectRoute.post(
  "/insertReport",
  [authenticateUser(), uploadFileMiddleware.single("file")],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) return next(new HttpException(400, "file didnt upload"));
      let file_name;
      file_name = `${file.originalname}${new Date().getTime()}`;
      await minioClient.uploadPhoto(file_name, file);
      console.log(+res.locals.user.id);
      const result = await projectService.insertProjectReport(
        +res.locals.user.id,
        {
          description: req.body.description,
          file_url: file_name,
        }
      );
      return res.status(200).send({ message: "done" });
    } catch (e) {
      return next(e);
    }
  }
);
