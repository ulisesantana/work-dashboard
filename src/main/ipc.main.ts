import { IpcMainEvent } from "electron";
import { ToggleAPI, UserData } from "../toggle";

interface LoginRequest {
  username: string;
  password: string;
}

export const login = (
  event: IpcMainEvent,
  { username, password }: LoginRequest,
) => {
  console.debug("login-request", username);
  if (Boolean(username)) {
    ToggleAPI.login(username, password)
      .then((json: object) => {
        console.debug("login-response");
        event.sender.send("login-response", json);
      })
      .catch((err) => {
        console.error(err.toString());
      });
  }
};

export const apiTokeUpdate = (event: IpcMainEvent, user: UserData) => {
  console.debug("api-token-update");
  ToggleAPI.updateUserData(user);
};

export const getClients = (event: IpcMainEvent) => {
  ToggleAPI.getClients()
    .then((json: object) => {
      console.debug("clients-get-response");
      event.sender.send("clients-get-response", json);
    })
    .catch((err) => {
      console.error(err.toString());
    });
};

export const getClientWeeklyReport = (
  event: IpcMainEvent,
  clientId: string,
) => {
  ToggleAPI.getClientWeeklyReport(clientId)
    .then((json: object) => {
      console.debug("client-weekly-report-request");
      event.sender.send("client-weekly-report-response", json);
    })
    .catch((err) => {
      console.error(err.toString());
    });
};
