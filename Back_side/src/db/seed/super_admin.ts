import { PermisionDto } from "../../model/permision.dto";
import { RoleDto } from "../../model/role.dto";
import { InsertUserDto } from "../../model/user.dto";

export const superAdminRole: RoleDto = {
  id: 1,
  name: "super_admin",
};
export const superAdminpermision: PermisionDto = {
  name: "وارد کردن نقش ها و دسترسی ها ",
  key: "inserting_roles_permisions",
};
export const superAdminUser: InsertUserDto = {
  first_name: "super",
  last_name: "admin",
  phone: "+989130099126",
  national_id: 1273202562,
  personal_id: 971406149,
  birthday: new Date(2000, 4, 21),
  entery_year: 2000,
  assigned_by: 1,
  role_ids: [1],
};
export const systemPermisions: PermisionDto[] = [
  {
    name: "وارد کردن نقش ها و دسترسی ها",
    key: "inserting_roles_permisions",
  },
  {
    name: "وارد کردن دانشجویان",
    key: "inserting_student",
  },
  {
    name: "وارد کردن اساتید",
    key: "inserting_prof",
  },
  {
    name: "وارد کردن کارکنان ",
    key: "inserting_emp",
  },
  {
    name: "تایید کردن دانشجویان ",
    key: "accepting_students",
  },
  {
    name: "انتخاب استاد راهنما ",
    key: "choosing_helper",
  },
  {
    name: "تایید پروژه های پیشنهاد شده ",
    key: "accepting_assign_project",
  },
  {
    name: "تایید نهایی پروژه ها ",
    key: "final_accepting_project",
  },
  {
    name: "لیست دانشجویان ",
    key: "students_list",
  },
  {
    name: "لیست اساتید ",
    key: "profs_list",
  },
];
