import { ReportResponse } from "./services/toggle/dto/Report/ReportResponse";
import { fromProjectResponseToProjectAndClient } from "./helpers/fromProjectResponseToProjectsAndClient";
import { WeeklyReport } from "../renderer/views/types";

export const WorkDashboard = (function () {
  return {
    transformTogglWeeklyReport: function ({
      total_grand,
      data,
    }: ReportResponse): WeeklyReport {
      const { projects, client } = fromProjectResponseToProjectAndClient(data);
      return {
        worked: total_grand,
        left: 0,
        client,
        projects,
      };
    },
  };
})();
