import { permisions, PrismaClient, roles } from "@prisma/client";

export class RoleRepository {
  private readonly db;
  constructor() {
    this.db = new PrismaClient();
  }
  async insertRole<T extends Omit<roles, "id"> & { permisions: number[] }>(
    data: T
  ) {
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
