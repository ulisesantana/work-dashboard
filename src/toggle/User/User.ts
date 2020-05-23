import { Workspace } from "../Workspace";

export interface User {
  id: string;
  api_token: string;
  default_wid: string;
  email: string;
  fullname: string;
  image_url: string;
  workspaces: Workspace[];
}
