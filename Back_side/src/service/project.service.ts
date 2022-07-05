import { ProjectRepository } from "../db/Repository/project.repository";
import { MinioClient } from "./image.service";
import { project_reports } from "@prisma/client";

class Project {
  private readonly projectRepository;
  private readonly imageService;
  constructor() {
    this.projectRepository = ProjectRepository;
    this.imageService = MinioClient;
  }
  async getProjectStatus(user_id: number) {
    return await this.projectRepository.getProjectStatus(user_id);
  }
  async choosingHelper(data: {
    user_id: number;
    file_url: string;
    helper_id: number;
    description: string;
  }) {
    await this.projectRepository.choosingHelper(data);
    return { message: "done" };
  }
  async getHelperProjects(user_id: number) {
    const result = await this.projectRepository.getHelperProjects(user_id);
    for (let project of result) {
      project.student.photo &&
        (project.student.photo = await this.imageService.generateLink(
          project.student.photo
        ));
    }
    return {
      project: result,
    };
  }
  async helperList(user_id: number) {
    try {
      const helpers = await this.projectRepository.helperList(user_id);
      for (let helper of helpers) {
        helper.photo &&
          (helper.photo = await this.imageService.generateLink(helper.photo));
      }
      return { helpers };
    } catch (e) {
      throw e;
    }
  }
  async statusChangeByHelper(
    user_id: number,
    data: { project_id: number; status: boolean }
  ) {
    //
    console.log(data);
    await this.projectRepository.statusChangeByHelper(user_id, data);
    return { message: "done" };
  }
  async insertSupervisor(data: {
    project_id: number;
    supervisor: {
      user_id: number;
      role_id: number;
    }[];
  }) {
    await this.projectRepository.insertSupervisor(data);
    return { message: "done" };
  }
  async getProjectSupervisorNeed(user_id: number) {
    const res = await this.projectRepository.getProjectSupervisorNeed(user_id);
    for (let project of res) {
      project.student.photo &&
        (project.student.photo = await this.imageService.generateLink(
          project.student.photo
        ));
    }
    return {
      project: res,
    };
  }
  async insertProjectReport(
    user_id: number,
    data: { file_url: string; description: string }
  ) {
    const res = await this.projectRepository.insertProjectReport(user_id, data);
    return { message: "done" };
  }
  async getProjectDetails(user_id: number, project_id: number) {
    try {
      const res = await this.projectRepository.getProjectDetails(
        user_id,
        project_id
      );
      if (res?.data && res.status == "waiting_acceptation") {
        res.data.file = res.data.file
          ? await this.imageService.generateLink(res.data.file)
          : "";
      }
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async hasNewNotification(user_id: number) {
    return await this.projectRepository.hasNewNotification(user_id);
  }
  async getProjectReports(project_id: number) {
    try {
      const project = await this.projectRepository.getProjectReports(
        project_id
      );
      for (let report of project.reports) {
        report.file_url = report.file_url
          ? await this.imageService.generateLink(report.file_url)
          : null;
      }
      return project;
    } catch (e) {
      throw e;
    }
  }
  async getProjectReportsForStudent(user_id: number) {
    try {
      const project = await this.projectRepository.getProjectReportsForStudent(
        user_id
      );
      for (let report of project.reports) {
        report.file_url = report.file_url
          ? await this.imageService.generateLink(report.file_url)
          : null;
      }
      console.log(project.reports);

      return project;
    } catch (e) {
      throw e;
    }
  }
}
/// get project supervisor
/// get project report

export const ProjectService = new Project();
