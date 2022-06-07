import { roles } from "@prisma/client";
import { RoleRepository } from "../db/Repository/role.repository";

export class RoleService {
  private readonly roleRepository;
  constructor() {
    this.roleRepository = new RoleRepository();
  }
  async insertRole<T extends Omit<roles, "id"> & { permisions: number[] }>(
    data: T
  ) {
    return await this.roleRepository.insertRole(data);
  }
  async getAllRoles() {
    return await this.roleRepository.getAllRoles();
  }
  async getAllPermisions() {
    const permisions = await this.roleRepository.getAllPermisions();
    return { data: permisions };
  }
}
