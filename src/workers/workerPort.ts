import http from "node:http";
import dotenv from "dotenv";
import { Endpoints, ResponseMessage, ResponseContentType } from "../constants";
import { UserController } from "../users/controller";
import Stringify from "../utils/Stringify";

dotenv.config();

const { WORKER_PORT } = process.env;
const PORT = parseInt(WORKER_PORT || "4001");
const { OK } = ResponseMessage;

const httpServer = http
  .createServer((req, res) => {
    const { url } = req;
    if (url?.startsWith(`/api/${Endpoints.USERS}`)) {
      UserController(req, res);
    } else {
      res.writeHead(OK.code, ResponseContentType);
      res.end(Stringify({ message: "No such endpoint found" }));
    }
  })
  .listen(PORT, () => {
    console.log(`Worker is listening on port ${PORT}`);
  });
