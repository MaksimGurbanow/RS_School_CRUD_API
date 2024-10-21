import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "./service";
import {
  Endpoints,
  ErrorMessages,
  Methods,
  RegExpressions,
  ResponseMessage,
} from "../constants";
import Stringify from "../utils/Stringify";
import { User } from "../types";

const {
  NOT_FOUND,
  OK,
  METHOD_NOT_ALLOWED,
  BAD_REQUEST,
  CREATED,
  DELETED,
  UPDATED,
} = ResponseMessage;

export function UserController(req: IncomingMessage, res: ServerResponse) {
  const userService = new UserService();
  const { method, url } = req;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    switch (method) {
      case Methods.GET:
        if (url === `/api/${Endpoints.USERS}`) {
          res.writeHead(OK.code, OK.message);
          res.end(
            Stringify({
              users: userService.getAllUsers(),
              message: "Users are found",
            })
          );
        } else if (RegExpressions.USER.test(url || "")) {
          const uuid = url?.split("/").pop()!;
          if (RegExpressions.UUID.test(uuid)) {
            const user = userService.getUserById(uuid);
            if (user) {
              res.writeHead(OK.code, OK.message);
              res.end(Stringify({ message: "User is found", ...user }));
            } else {
              res.writeHead(NOT_FOUND.code, NOT_FOUND.message);
              res.end(Stringify({ message: ErrorMessages.USER_NOT_FOUND }));
            }
          } else {
            res.writeHead(BAD_REQUEST.code, BAD_REQUEST.message);
            res.end(
              Stringify({
                message: ErrorMessages.UUID,
              })
            );
          }
        } else {
          res.writeHead(NOT_FOUND.code, NOT_FOUND.message);
          res.end(Stringify({ message: ErrorMessages.URL_NOT_MATCH }));
        }
        break;
      case Methods.POST:
        if (url === `/api/${Endpoints.USERS}`) {
          try {
            const newUser: User = JSON.parse(body);
            const validationError = userService.validateUser(newUser);
            if (validationError) {
              res.writeHead(BAD_REQUEST.code, BAD_REQUEST.message);
              res.end(Stringify({ message: validationError }));
              break;
            }
            const createdUser = userService.createUser(newUser);
            res.writeHead(CREATED.code, CREATED.message);
            res.end(Stringify({ message: "User created", ...createdUser }));
          } catch (error) {
            res.writeHead(BAD_REQUEST.code, BAD_REQUEST.message);
            res.end(Stringify({ message: ErrorMessages.BAD_JSON }));
          }
        } else {
          res.writeHead(NOT_FOUND.code, NOT_FOUND.message);
          res.end(Stringify({ message: ErrorMessages.URL_NOT_MATCH }));
        }
        break;
      case Methods.PUT:
        if (RegExpressions.USER.test(url || "")) {
          const uuid = url?.split("/").pop()!;
          if (RegExpressions.UUID.test(uuid)) {
            const userToUpdate = userService.getUserById(uuid);
            if (userToUpdate) {
              const updateUserData = JSON.parse(body);
              const updatedUser = userService.updateUser(uuid, updateUserData);
              res.writeHead(UPDATED.code, UPDATED.message);
              res.end(
                Stringify({
                  message: "User successfully updated",
                  ...updatedUser,
                })
              );
            } else {
              res.writeHead(NOT_FOUND.code, NOT_FOUND.message);
              res.end(Stringify({ message: ErrorMessages.USER_NOT_FOUND }));
            }
          } else {
            res.writeHead(BAD_REQUEST.code, BAD_REQUEST.message);
            res.end(
              Stringify({
                message: ErrorMessages.UUID,
              })
            );
          }
        } else {
          res.writeHead(NOT_FOUND.code, NOT_FOUND.message);
          res.end(Stringify({ message: ErrorMessages.URL_NOT_MATCH }));
        }
        break;
      case Methods.DELETE:
        if (RegExpressions.USER.test(url || "")) {
          const uuid = url?.split("/").pop()!;
          if (RegExpressions.UUID.test(uuid)) {
            const deletedUser = userService.deleteUser(uuid);
            if (deletedUser) {
              res.writeHead(DELETED.code, DELETED.message);
              res.end(Stringify({ message: "User deleted", ...deletedUser }));
            } else {
              res.writeHead(NOT_FOUND.code, NOT_FOUND.message);
              res.end(Stringify({ message: ErrorMessages.USER_NOT_FOUND }));
            }
          } else {
            res.writeHead(BAD_REQUEST.code, BAD_REQUEST.message);
            res.end(
              Stringify({
                message: ErrorMessages.UUID,
              })
            );
          }
        } else {
          res.writeHead(NOT_FOUND.code, NOT_FOUND.message);
          res.end(Stringify({ message: ErrorMessages.URL_NOT_MATCH }));
        }
        break;
      default:
        res.writeHead(METHOD_NOT_ALLOWED.code, METHOD_NOT_ALLOWED.message);
        res.end(`There is no such ${method} request method for users endpoint`);
    }
  });
}
