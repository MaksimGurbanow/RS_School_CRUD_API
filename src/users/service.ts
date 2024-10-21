import { users } from "../constants";
import { CreateUserDto } from "../dto/CreateUserDto";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types";

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
    const deletedUser = users.splice(deletedUserIndex, 1)[0];
    return deletedUser;
  }

  public updateUser(id: number | string, userData: Partial<User>) {
    const userIndex = users.findIndex((user) => user.id === id);
  
    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;
  
    return updatedUser;
  }

  public validateUser(user: User) {
    if (!user.age) return "Bad request: age is required";
    if (typeof user.age !== "number")
      return "Bad request: age must be a number";
    if (!user.username) return "Bad request: username is required";
    if (typeof user.username !== "string")
      return "Bad request: username must be a string";
    if (!user.hobbies) return "Bad request: hobbies are required";
    if (user.hobbies instanceof Array)
      return "Bad request: hobbies must be an Array";
    return null;
  }
}
