import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "./service";
import {
  Endpoints,
  Methods,
  RegExpressions,
  ResponseMessage,
} from "../constants";
import Stringify from "../utils/Stringify";

const { NOT_FOUND, OK, METHOD_NOT_ALLOWED, BAD_REQUEST } = ResponseMessage;

export function UserController(req: IncomingMessage, res: ServerResponse) {
  const userService = new UserService();
  const { method, url } = req;
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
            res.end(Stringify({ message: "No user with such id was found" }));
          }
        } else {
          res.writeHead(BAD_REQUEST.code, BAD_REQUEST.message);
          res.end(
            Stringify({
              message:
                "The user id is not correct. Please, ensure it matches v4 format",
            })
          );
        }
      } else {
        res.writeHead(NOT_FOUND.code, NOT_FOUND.message);
        res.end(Stringify({ message: "The URL isn't matching" }));
      }
      break;
    case Methods.POST:
      break;
    case Methods.PUT:
      break;
    case Methods.DELETE:
      break;
    default:
      res.writeHead(METHOD_NOT_ALLOWED.code, METHOD_NOT_ALLOWED.message);
      res.end(`There is no such ${method} request method for users endpoint`);
  }
}
