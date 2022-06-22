import { PrismaClient, users } from "@prisma/client";
import { includes } from "lodash";
import { HttpException } from "../../errorHandling/httpException";
import { InsertUserDto } from "../../model/user.dto";

export class User {
  private readonly db;
  constructor() {
    this.db = new PrismaClient();
  }
  async insert(user: InsertUserDto) {
    try {
      user.national_id = +user.national_id;
      user.personal_id = +user.personal_id;
      user.birthday = new Date(user.birthday);
      user.entery_year = +user.entery_year;
      user.assigned_by = +user.assigned_by;
      const { field_id, role_ids, ...user_data } = user;
      await this.db.users.create({
        data: {
          roles_of_users: {
            create:
              role_ids.length > 1
                ? role_ids.map((elem) => {
                    return {
                      role: {
                        connect: {
                          id: +elem,
                        },
                      },
                    };
                  })
                : {
                    role: {
                      connect: {
                        id: +role_ids,
                      },
                    },
                  },
          },
          field: field_id
            ? {
                connect: {
                  id: +field_id,
                },
              }
            : undefined,
          ...user_data,
        },
      });
      return;
    } catch (e) {
      console.log(e);

      return new HttpException(500, "error");
    }
  }
  async login(phone: string): Promise<Partial<users> | HttpException> {
    const user = await this.db.users.findFirst({
      where: {
        AND: [{ phone }, { active: true }],
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        phone: true,
        national_id: true,
        personal_id: true,
        photo: true,
        roles_of_users: {
          select: {
            role: {
              select: {
                name: true,
                id: true,
                permisions_of_roles: {
                  select: {
                    permision: {
                      select: {
                        name: true,
                        id: true,
                        key: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (user) return user;
    return new HttpException(404, "user with this phone doesnt exist");
  }
  async getAllNotActiveUsers(page: number, size: number) {
    const query = {
      where: {
        active: false,
      },
    };
    const user = await this.db.users.findMany({
      ...query,
      select: {
        first_name: true,
        last_name: true,
        national_id: true,
        birthday: true,
        personal_id: true,
        phone: true,
        photo: true,
        id: true,
        field: {
          select: {
            name: true,
          },
        },
      },
      skip: (page - 1) * size,
      take: size,
    });
    const count = await this.db.users.count();
    return { user, count };
  }
  async insertField(data: { name: string }) {
    try {
      const isExist = await this.db.field.findFirst({
        where: {
          name: data.name,
        },
      });
      if (isExist)
        throw new HttpException(400, "another field exist with this name");
      await this.db.field.create({
        data: {
          name: data.name,
        },
      });
      return;
    } catch (e) {
      throw e;
    }
  }
  async getAllField() {
    const fields = await this.db.field.findMany();
    return { data: fields };
  }
  async acceptStudent(id: number) {
    try {
      this.db.users.update({
        where: {
          id,
        },
        data: {
          active: true,
        },
      });
      return;
    } catch (e) {
      throw e;
    }
  }
}

export const UserRepository = new User();
