import { User } from "../entities";

export interface ResponseUserInfo {
  since: number;
  data: User;
}
