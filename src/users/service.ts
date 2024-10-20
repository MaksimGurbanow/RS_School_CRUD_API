import { users } from "../constants";
import { CreateUserDto } from "../dto/CreateUserDto";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  public getAllUsers() {
    return users;
  }

  public getUserById(id: number | string) {
    return users.find((user) => user.id === id);
  }

  public createUser(user: CreateUserDto) {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    return newUser;
  }

  public deleteUser(id: number | string) {
    const deletedUserIndex = users.findIndex((user) => user.id === id);
    const deletedUser = users.splice(deletedUserIndex, 1);
    return deletedUser;
  }
}
