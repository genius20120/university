interface UserModel {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  national_id: number;
  personal_id: number;
  birthday: Date;
  entery_year: number;
  photo?: string;
  created_at?: Date;
  assigned_by: number;
  active?: boolean;
  field_id?: number;
  role_ids?: [number];
}
export type InsertUserDto = Omit<
  UserModel,
  "created_at" | "id" | "assigned_projects"
> & {
  role_ids: number[];
};
