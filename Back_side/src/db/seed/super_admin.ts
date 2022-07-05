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
    name: "وارد کردن رشته ها ",
    key: "inserting_study_fields",
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
    name: " پروژه  ",
    key: "student_project",
  },
  {
    name: "عملیات استاد راهنما ",
    key: "helper_operations",
  },
  {
    name: "انتخاب ناظران پروژه ",
    key: "assign_project_supervisors",
  },
  {
    name: "وارد کردن تنظیمات  ",
    key: "inserting_setting",
  },
  {
    name: "لیست دانشجویان ",
    key: "students_list",
  },
  {
    name: "لیست اساتید ",
    key: "profs_list",
  },
  {
    name: "عملیات ناظران بر پروژه ",
    key: "supervisor_operations",
  },
  {
    name: "انتخاب مکان و زمان  نهایی دفاع ",
    key: "inserting_final_defence_time_location",
  },
];
