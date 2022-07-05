import { prisma, PrismaClient, users } from "@prisma/client";
import { includes } from "lodash";
import { HttpException } from "../../errorHandling/httpException";
import { InsertUserDto } from "../../model/user.dto";
import { DbConnection } from "./DbConnection";

export class User {
  private readonly db;
  constructor() {
    this.db = DbConnection;
  }
  async checkDuplicationHelper(role_ids: number[]) {
    try {
      const fileterRole =
        role_ids.length > 1
          ? role_ids.map((elem) => {
              return {
                id: +elem,
              };
            })
          : [{ id: +role_ids }];
      const roles = await this.db.roles.findMany({
        where: {
          AND: [
            {
              OR: [...fileterRole],
            },
            {
              permisions_of_roles: {
                some: {
                  permision: {
                    key: "helper_operations",
                  },
                },
              },
            },
          ],
        },
      });
      if (roles.length > 1)
        throw new HttpException(
          400,
          "فقط یک نقش با دسترسی های استاد راهنما میتوان انتخاب کرد "
        );
      return "ok";
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async insert(user: InsertUserDto) {
    try {
      await this.checkDuplicationHelper(user.role_ids);
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
      if (e instanceof HttpException) return e;
      return new HttpException(
        400,
        "فردی دیگر با یکی از این مشخصات موجود میباشد "
      );
    }
  }
  async login(phone: string): Promise<Partial<users> | HttpException> {
    const user = await this.db.users.findFirst({
      where: {
        AND: [{ phone }, { active: true }],
      },
      select: {
        id: true,
        room_id: true,
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
      await this.db.users.update({
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
  async searchUser(
    filter: { first_name?: string; last_name?: string; personal_id?: number },
    page: number,
    size: number,
    user_id: number
  ): Promise<{
    data: {
      id: number;
      first_name: string;
      last_name: string;
      photo?: string | null;
      room_id: string | null;
      isSeen: boolean;
    }[];
    count: number;
  }> {
    try {
      if (!filter.first_name && !filter.last_name && !filter.personal_id)
        return {
          data: (
            await this.db.users.findMany({
              select: {
                id: true,
                first_name: true,
                last_name: true,
                photo: true,
                room_id: true,
              },
              where: {
                id: {
                  not: user_id,
                },
              },
              orderBy: { created_at: "desc" },
              skip: (page - 1) * size,
              take: size,
            })
          ).map((elem) => {
            return {
              ...elem,
              isSeen: true,
            };
          }),
          count: await this.db.users.count({
            where: {
              id: {
                not: user_id,
              },
            },
          }),
        };

      //
      let query = ` select count(*) as count ,id,room_id,first_name,last_name,photo from users where ( id != ${user_id} `; /// just to prevent checking we put some conditon that is all time true
      if (filter.first_name)
        query = query + ` and first_name like '%${filter.first_name}%'`;
      if (filter.last_name)
        query = query + ` and last_name like '%${filter.last_name}%'`;
      if (filter.personal_id)
        query = query + ` and personal_id = ${filter.personal_id}`;
      query =
        query +
        `) group by id ORDER BY created_at DESC OFFSET ${
          size * (page - 1)
        } LIMIT ${size};`;
      const user = await this.db.$queryRawUnsafe<
        {
          id: number;
          first_name: string;
          last_name: string;
          photo: string | null;
          count: number;
          room_id: string;
        }[]
      >(query);
      const count = user.length > 0 ? user[0].count : 0;
      return {
        data: user.map((elem) => {
          const { count, ...data } = elem;
          return {
            ...data,
            isSeen: true,
          };
        }),
        count,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(500, "db_error");
    }
  }
  async searchSupervisorUser(
    filter: { first_name?: string; last_name?: string; personal_id?: number },
    user_id: number,
    project_id: number
  ) {
    try {
      if (!filter.first_name && !filter.last_name && !filter.personal_id)
        return (
          await this.db.users.findMany({
            select: {
              id: true,
              first_name: true,
              last_name: true,
              photo: true,
              roles_of_users: {
                select: {
                  role: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
            where: {
              AND: [
                {
                  id: {
                    not: user_id,
                  },
                },
                {
                  project_helper: {
                    none: {
                      id: project_id,
                    },
                  },
                },
                {
                  roles_of_users: {
                    some: {
                      role: {
                        id: {
                          not: 2,
                        },
                      },
                    },
                  },
                },
              ],
            },
            orderBy: { created_at: "desc" },
          })
        ).map((elem) => {
          const { roles_of_users, ...userData } = elem;
          const roles: { name: string; id: number }[] = [];
          elem.roles_of_users.forEach((role) => roles.push(role.role));
          return {
            ...userData,
            roles,
          };
        });

      //
      console.log("its here");
      let query = ` select id from users  where ( id != ${user_id}   `; /// just to prevent checking we put some conditon that is all time true
      if (filter.first_name)
        query = query + ` and first_name like '%${filter.first_name}%'`;
      if (filter.last_name)
        query = query + ` and last_name like '%${filter.last_name}%'`;
      if (filter.personal_id)
        query = query + ` and personal_id = ${filter.personal_id}`;
      query = query + `) group by id ORDER BY created_at DESC ;`;
      const user = await this.db.$queryRawUnsafe<
        {
          id: number;
        }[]
      >(query);
      console.log(user);
      return (
        user.length > 0
          ? await this.db.users.findMany({
              select: {
                id: true,
                first_name: true,
                last_name: true,
                photo: true,
                roles_of_users: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
              where: {
                AND: [
                  {
                    OR: user,
                  },
                  {
                    project_helper: {
                      none: {
                        id: project_id,
                      },
                    },
                  },
                  {
                    roles_of_users: {
                      some: {
                        role: {
                          id: {
                            not: 2,
                          },
                        },
                      },
                    },
                  },
                ],
              },
              orderBy: { created_at: "desc" },
            })
          : []
      ).map((elem) => {
        const { roles_of_users, ...userData } = elem;
        const roles: { name: string; id: number }[] = [];
        elem.roles_of_users.forEach((role) => roles.push(role.role));
        return {
          ...userData,
          roles,
        };
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(500, "db_error");
    }
  }
}

export const UserRepository = new User();
