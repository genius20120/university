import { UserDto } from "../model/user.dto";

export function loginMiddleware<T extends UserDto>(data: T) {
  const { personal_id, phone } = data;
}
