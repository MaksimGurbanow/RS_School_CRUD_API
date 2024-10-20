import { UUID } from "crypto";

export interface User {
  id: number | string | UUID;
  username: string;
  age: number;
  hobbies: string[];
}

export interface IResponseMessage {
  code: number;
  message: string;
}
