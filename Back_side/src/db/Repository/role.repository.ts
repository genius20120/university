import { permisions, roles } from "@prisma/client";
import { Http2ServerResponse } from "http2";
import { HttpException } from "../../errorHandling/httpException";
import { DbConnection } from "./DbConnection";

export class RoleRepository {
  private readonly db;
  constructor() {
    this.db = DbConnection;
  }
  async insertRole<T extends Omit<roles, "id"> & { permisions: number[] }>(
    data: T
  ) {
    try {
      const { score, name, permisions } = data;
      return await this.db.roles.create({
        data: {
          score,
          name,
          permisions_of_roles: {
            create: permisions.map((elem) => {
              return {
                permision: {
                  connect: {
                    id: elem,
                  },
                },
              };
            }),
          },
        },
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(400, "another is existed");
    }
  }
  async getAllRoles(): Promise<Pick<roles, "name" | "id">[]> {
    const roles = await this.db.roles.findMany({
      select: {
        name: true,
        id: true,
      },
    });
    return roles;
  }
  async getAllPermisions(): Promise<Pick<permisions, "id" | "name">[]> {
    const permisions = await this.db.permisions.findMany({
      select: {
        name: true,
        id: true,
      },
    });
    return permisions;
  }
}
