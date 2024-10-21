import { IResponseMessage, User } from "./types";

export const enum Endpoints {
  USERS = "users",
}

export const enum Methods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export const ResponseMessage: { [key: string]: IResponseMessage } = {
  OK: { code: 200, message: "OK" },
  CREATED: { code: 201, message: "Created" },
  UPDATED: { code: 200, message: "Updated" },
  BAD_REQUEST: { code: 400, message: "Bad request" },
  DELETED: { code: 204, message: "Deleted" },
  NOT_FOUND: { code: 404, message: "Not found" },
  METHOD_NOT_ALLOWED: { code: 405, message: "Method not allowed" },
  SERVER_ERROR: { code: 500, message: "Internal server error" },
} as const;

export const ResponseContentType = { "Content-type": "application/json" };

export const users: User[] = [];

export const RegExpressions = {
  USER: /\/api\/users\/[0-9a-fA-F]/,
  UUID: /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/,
};

export const ErrorMessages = {
  UUID: "The user id is not uuid. Please, ensure it matches v4 format",
  URL_NOT_MATCH: "The URL isn't matching",
  BAD_JSON: "Invalid JSON body",
  USER_NOT_FOUND: "No user found with such ID",
};
