import { HttpException } from "../../errorHandling/httpException";
import { DbConnection } from "./DbConnection";

class project {
  private readonly db;
  constructor() {
    this.db = DbConnection;
  }
  async choosingHelper(data: {
    user_id: number;
    file_url: string;
    helper_id: number;
    description: string;
  }) {
    try {
      const helper_score_weight = await (
        await this.db.roles.findFirst({
          where: {
            roles_of_users: {
              some: {
                user_id: data.helper_id,
              },
            },
            permisions_of_roles: {
              some: {
                permision: {
                  key: "helper_operations",
                },
              },
            },
          },
        })
      )?.score;
      if (!helper_score_weight)
        throw new HttpException(500, "score not found ");
      const isProjectExist = await this.db.project.findFirst({
        where: { student_id: data.user_id },
      });
      if (isProjectExist && isProjectExist.status != "rejected")
        throw new HttpException(400, "you already has project");
      else if (isProjectExist) {
        await this.db.project.update({
          where: { id: isProjectExist.id },
          data: {
            file_url: data.file_url,
            student_description: data.description,
            helper_id: data.helper_id,
            status: "waiting_acceptation",
            helper_score_weight,
          },
        });
      } else {
        await this.db.project.create({
          data: {
            file_url: data.file_url,
            student_description: data.description,
            helper_id: data.helper_id,
            status: "waiting_acceptation",
            student_id: data.user_id,
            helper_score_weight,
          },
        });
      }
      await this.db.notification.create({
        data: {
          description: "پروژه ی جدیدی برای شما ارسال شد ",
          title: "تایید پروژه ",
          sent_at: new Date(),
          opened: false,
        },
      });
      return "done";
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getHelperProjects(user_id: number) {
    try {
      const project = await this.db.project.findMany({
        where: {
          helper_id: user_id,
        },
        select: {
          status: true,
          id: true,
          student: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              personal_id: true,
              photo: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return project;
    } catch (e) {
      throw new HttpException(500, "db_error");
    }
  }
  async getProjectStatus(user_id: number) {
    try {
      const project = await this.db.project.findFirst({
        where: {
          student_id: user_id,
        },
      });
      if (!project)
        return {
          status: "no_project",
        };
      if (project.status === "rejected" && project.helper_id) {
        const helperInfo: {
          first_name: string;
          last_name: string;
        } | null = await this.db.users.findFirst({
          where: { id: project.helper_id },
          select: { first_name: true, last_name: true },
        });
        return {
          status: project.status,
          ...helperInfo,
        };
      }
      return {
        status: project.status,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(500, "db_error");
    }
  }
  async helperList(user_id: number) {
    try {
      const helpers = await this.db.users.findMany({
        select: {
          photo: true,
          first_name: true,
          last_name: true,
          id: true,
        },
        where: {
          field: {
            users: {
              some: {
                id: user_id,
              },
            },
          },
          roles_of_users: {
            some: {
              role: {
                permisions_of_roles: {
                  some: {
                    permision: {
                      key: "helper_operations",
                    },
                  },
                },
              },
            },
          },
        },
      });
      return helpers;
    } catch (e) {
      console.log(e);
      throw new HttpException(500, "user not found ");
    }
  }
  async statusChangeByHelper(
    user_id: number,
    data: { project_id: number; status: boolean; description?: string }
  ) {
    try {
      const project_info = await this.db.project.findFirst({
        where: {
          helper_id: user_id,
          id: data.project_id,
        },
      });
      if (!project_info)
        throw new HttpException(400, "project not belong to you ");
      const project = await this.db.project.update({
        where: {
          id: data.project_id,
        },
        data: {
          status: data.status ? "accepted" : "rejected",
        },
      });
      if (!data.status) {
        await this.db.notification.create({
          data: {
            user_id: project_info.student_id,
            title: "عدم  تایید پروژه توسط استاد راهنما ",
            description: data.description
              ? data.description
              : "پروژه شما مورد قبول استاد رهنما قرار نگرفت ",
          },
        });
      } else {
        const admin = await this.db.users.findMany({
          select: { id: true },
          where: {
            field: { users: { some: { id: project_info.student_id } } },
            roles_of_users: {
              some: {
                role: {
                  permisions_of_roles: {
                    some: { permision: { key: "assign_project_supervisors" } },
                  },
                },
              },
            },
          },
        });
        const createNotif = admin.map((elem) => {
          return this.db.notification.create({
            data: {
              user_id: elem.id,
              description: "پروژه جدیدی برای انتخاب ناظران برای شما آماده است ",
              title: "انتخاب ناظران ",
            },
          });
        });
        const isCreated = await Promise.all(createNotif).catch((e) => {
          console.log(e);
          throw new HttpException(500, "db_error");
        });
        await this.db.notification.create({
          data: {
            user_id: project_info.student_id,
            title: "تایید پروژه ",
            description: "پروژه شما توسط استاد راهنما انتخاب شده تایید شد ",
          },
        });
      }
      return "done";
    } catch (e) {
      throw e;
    }
  }
  async insertSupervisor(data: {
    project_id: number;
    supervisor: {
      user_id: number;
      role_id: number;
    }[];
  }) {
    try {
      const supervisorScorePromise: {
        user_id: number;
        role_id: number;
        score: Promise<{
          score: number | null;
        } | null>;
      }[] = data.supervisor.map((elem) => {
        return {
          user_id: elem.user_id,
          role_id: elem.role_id,
          score: this.db.roles.findFirst({
            where: { id: elem.role_id },
            select: { score: true },
          }),
        };
      });

      const supervisor = await Promise.all(
        supervisorScorePromise.map((elem) => elem.score)
      )
        .then((score) => {
          return supervisorScorePromise.map((sv, i) => {
            if (!score[i])
              throw new HttpException(400, "one of roles didnt find  ");
            if (!score[i]?.score)
              throw new HttpException(400, "one of roles doesnt has score");
            return {
              role_id: sv.role_id,
              user_id: sv.user_id,
              score: score[i]?.score,
            };
          });
        })
        .catch((e) => {
          throw e;
        });
      const create = supervisor.map((elem) => {
        return this.db.assign_supervisor.create({
          data: {
            project_id: data.project_id,
            user_id: elem.user_id,
            role_id: elem.role_id,
            score_weight: elem.score ? elem.score : 0,
          },
        });
      });
      const result = await Promise.all(create);
      const notification = data.supervisor.map((elem) => {
        return this.db.notification.create({
          data: {
            user_id: elem.user_id,
            title: "نظرات بر پروژه جدید ",
            description: "پروژه جدیدی به شما تعلق گرفت ",
          },
        });
      });
      const createNotificatoin = await Promise.all(notification);
      await this.db.project.update({
        where: {
          id: data.project_id,
        },
        data: {
          status: "in_progress",
        },
      });
      return "done";
    } catch (e) {
      console.log(e);

      throw e;
    }
  }

  async getProjectSupervisorNeed(user_id: number) {
    try {
      const project = await this.db.project.findMany({
        where: {
          status: "accepted",
          student: {
            field: {
              users: {
                some: {
                  id: user_id,
                },
              },
            },
          },
        },
        select: {
          status: true,
          id: true,
          student: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              personal_id: true,
              photo: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return project;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async insertProjectReport(
    user_id: number,
    data: { file_url: string; description: string }
  ) {
    await this.db.project_reports.create({
      data: {
        file_url: data.file_url,
        description: data.description,
        project: {
          connect: {
            student_id: user_id,
          },
        },
      },
    });
    return "done";
  }
  async getProjectDetails(user_id: number, project_id: number) {
    try {
      const project = await this.db.project.findUnique({
        where: {
          id: project_id,
        },
      });
      if (!project) throw new HttpException(404, "not found ");
      if (
        project.status == "in_progress" ||
        project.status == "waiting_score"
      ) {
        const projectReports = await this.db.project_reports.findMany({
          where: {
            project_id,
          },
        });
        return {
          status: project.status,
          reports: projectReports,
        };
      } else if (project.status == "waiting_acceptation") {
        return {
          status: project.status,
          data: {
            description: project.student_description,
            file: project.file_url,
          },
        };
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async hasNewNotification(user_id: number) {
    try {
      const hasNewNotif = await this.db.notification.findFirst({
        where: {
          user_id,
          opened: false,
        },
      });
      if (hasNewNotif) return { hasNewNotification: true };
      return { hasNewNotification: false };
    } catch (e) {
      throw e;
    }
  }
  async getProjectReports(project_id: number) {
    try {
      const reports = await this.db.project_reports.findMany({
        where: {
          project_id,
        },
        select: {
          file_url: true,
          description: true,
          created_at: true,
          id: true,
        },
      });
      return { reports };
    } catch (e) {
      throw e;
    }
  }
  async getProjectReportsForStudent(user_id: number) {
    try {
      const reports = await this.db.project_reports.findMany({
        where: {
          project: {
            student_id: user_id,
          },
        },
        select: {
          file_url: true,
          description: true,
          created_at: true,
          id: true,
        },
      });
      return { reports };
    } catch (e) {
      throw e;
    }
  }
}
export const ProjectRepository = new project();
