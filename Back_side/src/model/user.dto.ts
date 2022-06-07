export interface UserDto {
  first_name: string;
  last_name: string;
  phone: string;
  national_id: number;
  personal_id: number; /// for each role should be diffrent for example for student is student_id
  birthday: Date;
  entery_year?: number;
  study_field?: string;
  photo?: string;
  role_name: string;
}
