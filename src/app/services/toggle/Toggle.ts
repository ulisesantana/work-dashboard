import { TogglClient, User } from "./entities";
import fetch from "node-fetch";
import { DateCalculator, Days } from "../../helpers/DateCalculator";
import { SummaryReportResponse } from "./dto/Report/SummaryReportResponse";

export const ToggleAPI = (() => {
  const apiUrl = "https://www.toggl.com/api/v8";
  const apiUrlReport = "https://toggl.com/reports/api/v2";
  let apiToken: string;
  let email: string;
  return {
    getAuthHeaders: function (key: string = apiToken, value = "api_token") {
      return {
        Authorization: `Basic ${Buffer.from(`${key}:${value}`).toString(
          "base64",
        )}`,
      };
    },

    login: async function (username: string, password: string): Promise<User> {
      console.debug("Toggle.login", username);
      const response = await fetch(`${apiUrl}/me`, {
        headers: this.getAuthHeaders(username, password),
      });
      console.log("LOGIN -", response.status, response);
      return await response.json();
    },

    // TODO: Hay que quitar esto de aquí
    updateUserData: function ({
      api_token,
      default_wid,
      email: userEmail,
    }: User) {
      console.log("ApiToken updated.");
      apiToken = api_token;
      email = userEmail;
    },

    getClients: async function (): Promise<TogglClient[]> {
      const response = await fetch(`${apiUrl}/clients`, {
        headers: this.getAuthHeaders(),
      });
      console.log("GET CLIENTS -", response.status);
      if (response.status === 200) {
        return await response.json();
      }
      throw new Error("Error getting client - " + response.statusText);
    },

    getClientWeeklyReport: async function ({
      id,
      wid,
    }: TogglClient): Promise<any> {
      const lastMonday = DateCalculator.calcLastWeekday(Days.Monday);
      const url = `${apiUrlReport}/weekly?workspace_id=${wid}&client_ids=${id}&user_agent=${email}&since=${lastMonday}"`;
      console.debug("REQUEST CLIENTS WEEKLY REPORT-", url);
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });
      console.log("GET CLIENTS WEEKLY REPORT-", response.status);
      if (response.status === 200) {
        return await response.json();
      }
      console.error(response.url);
      throw new Error(
        "Error getting client weekly report - " + response.statusText,
      );
    },
    getLastDayReport: async function (
      workspaceId: string,
    ): Promise<SummaryReportResponse> {
      const lastWorkday = DateCalculator.calcLastWorkday();
      const response = await fetch(
        `${apiUrlReport}/summary?workspace_id=${workspaceId}&user_agent=${email}&since=${lastWorkday}"&until=${lastWorkday}`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      console.log("GET LAST DAY REPORT-", response.status);
      if (response.status === 200) {
        return await response.json();
      }
      console.error(response.url);
      throw new Error("Error getting last day report - " + response.statusText);
    },
  };
})();
