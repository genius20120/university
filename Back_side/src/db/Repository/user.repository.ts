import { PrismaClient, users } from "@prisma/client";
import { includes } from "lodash";
import { HttpException } from "../../errorHandling/httpException";

const db = new PrismaClient();
export async function loginRepository(
  phone: string
): Promise<Partial<users> | HttpException> {
  const user = await db.users.findFirst({
    where: {
      phone,
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
export async function getAllUsers() {
  const user = db.users.findMany();
  return user;
}
type insertUserDto = Pick<
  users,
  | "birthday"
  | "first_name"
  | "last_name"
  | "national_id"
  | "personal_id"
  | "entery_year"
  | "phone"
  | "photo"
  | "study_field"
> & { role_ids: number[]; assigned_by: number };

export class UserRepository {
  private readonly db;
  constructor() {
    this.db = new PrismaClient();
  }
  async insertStudent(user: insertUserDto) {
    const { role_ids, ...user_data } = user;
    db.users.create({
      data: {
        roles_of_users: {
          create: role_ids.map((elem) => {
            return {
              role: {
                connect: {
                  id: elem,
                },
              },
            };
          }),
        },
        ...user_data,
      },
    });
  }
}
