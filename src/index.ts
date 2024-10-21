import http from "node:http";
import {
  users,
  Endpoints,
  ResponseMessage,
  ResponseContentType,
} from "./constants";
import { UserController } from "./users/controller";
import Stringify from "./utils/Stringify";
import dotenv from "dotenv";

dotenv.config();

const { PORT }: { PORT: number | string } = process.env as {
  PORT: number | string;
};

const { OK } = ResponseMessage;

export const httpServer = http
  .createServer((req, res) => {
    const { url } = req;
    if (url?.startsWith(`/api/${Endpoints.USERS}`)) {
      UserController(req, res);
    } else {
      res.writeHead(OK.code, ResponseContentType);
      res.end(Stringify({ message: "No such endpoint found" }));
    }
  })
  .listen(PORT)
  .on("listening", () => {
    console.log("Server is listenning on PORT " + PORT);
  });
