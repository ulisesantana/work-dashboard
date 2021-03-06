import { IpcMainEvent } from "electron";
import { TogglClient, ToggleAPI } from "../app/services/toggle";
import { WorkDashboard } from "../app";
import { WeeklyReportResponse } from "../app/services/toggle/dto/Report/WeeklyReportResponse";
import { User } from "../app/services/toggle/entities";

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
        return apiTokeUpdate(event, json as User);
      })
      .then((data) => {
        event.sender.send("login-response", data);
      })
      .catch((err) => {
        console.error(err.toString());
      });
  }
};

export const apiTokeUpdate = async (event: IpcMainEvent, user: User) => {
  console.debug("api-token-update");
  ToggleAPI.updateUserData(user);
  return user;
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
  client: TogglClient,
) => {
  ToggleAPI.getClientWeeklyReport(client)
    .then((json: object) => {
      console.debug("client-weekly-report-request");
      event.sender.send("client-weekly-report-response", json);
    })
    .catch((err) => {
      console.error(err.toString());
    });
};

export const getLastDayReport = (event: IpcMainEvent, workspaceId: string) => {
  ToggleAPI.getLastDayReport(workspaceId)
    .then((json: object) => {
      console.debug("last-day-report-request");
      event.sender.send("last-day-report-response", json);
    })
    .catch((err) => {
      console.error(err.toString());
    });
};
