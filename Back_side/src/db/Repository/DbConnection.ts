import { PrismaClient } from "@prisma/client";

class Connection {
  public readonly db;
  constructor() {
    this.db = new PrismaClient();
  }
}
export const DbConnection = new Connection().db;
