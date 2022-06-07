import { PrismaClient } from "@prisma/client";
import {
  superAdminRole,
  superAdminUser,
  systemPermisions,
} from "./super_admin";

export { superAdminRole, superAdminUser } from "./super_admin";

const db = new PrismaClient();
async function main() {
  const permisions = await db.permisions.createMany({
    data: systemPermisions,
  });
  const allPermisions = await db.permisions.findMany();
  const role = await db.roles.create({
    data: {
      ...superAdminRole,
      permisions_of_roles: {
        create: allPermisions.map((e) => {
          return {
            permision: {
              connect: {
                id: e.id,
              },
            },
          };
        }),
      },
    },
  });
  const { role_name, ...userData } = superAdminUser;
  const user = await db.users.create({
    data: {
      ...userData,
      assigned_by: 1,
      roles_of_users: {
        create: [
          {
            role: {
              connect: {
                name: role_name,
              },
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    db.$disconnect();
  });
