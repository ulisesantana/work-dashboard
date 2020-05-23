import { Client } from "../toggle/Client";
import { UserData } from "../toggle/User";
import fetch from "node-fetch";

export const ToggleAPI = (() => {
  const apiUrl = "https://www.toggl.com/api/v8";
  const apiUrlReport = "https://toggl.com/reports/api/v2";
  let apiToken: string;
  let workspaceId: string;
  let email: string;
  return {
    getAuthHeaders: function (key: string = apiToken, value = "api_token") {
      return {
        Authorization: `Basic ${Buffer.from(`${key}:${value}`).toString(
          "base64",
        )}`,
      };
    },

    login: async function (
      username: string,
      password: string,
    ): Promise<UserData> {
      const response = await fetch(`${apiUrl}/me`, {
        headers: this.getAuthHeaders(username, password),
      });
      console.log("LOGIN -", response.status);
      const json = await response.json();
      apiToken = json.api_token;
      workspaceId = json.default_wid;
      username = json.email;
      return json;
    },

    updateUserData: function ({
      api_token,
      default_wid,
      email: userEmail,
    }: UserData) {
      console.log("ApiToken updated.");
      apiToken = api_token;
      workspaceId = default_wid;
      email = userEmail;
    },

    getClients: async function (): Promise<Client[]> {
      const response = await fetch(
        `${apiUrl}/workspaces/${workspaceId}/clients`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      console.log("GET CLIENTS -", response.status);
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      throw new Error("Error getting client - " + response.statusText);
    },

    getClientWeeklyReport: async function (clientId: string): Promise<any> {
      const response = await fetch(
        `${apiUrlReport}/weekly?workspace_id=${workspaceId}&client_ids=${clientId}&user_agent=${email}"`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      console.log("GET CLIENTS WEEKLY REPORT-", response.status);
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      console.error(response.url);
      throw new Error(
        "Error getting client weekly report - " + response.statusText,
      );
    },
  };
})();
