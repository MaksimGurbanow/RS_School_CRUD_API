import http from "node:http";
import {
  users,
  Endpoints,
  ResponseMessage,
  ResponseContentType,
} from "./constants";
import { UserController } from "./users/controller";
import Stringify from "./utils/Stringify";

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
  .listen(5000)
  .on("connection", () => {
    console.log("Someone connected");
  });

// (req, res) => {
//   console.log(req.url);
//   const { url } = req;
//   if (url === `/api/${Endpoints.USERS}`) {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(users));
//   } else if (/\/api\/users\/[0-9]+/.test(url || "")) {
//     const userId = url?.split("/").pop();
//     const user = users.find((user) => user.id === Number(userId));

//     if (user) {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(user));
//     } else {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "User with this id doesn't exist" }));
//     }
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Not found" }));
//   }
// }
