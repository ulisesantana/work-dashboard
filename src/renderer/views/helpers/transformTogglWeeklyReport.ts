import { WeeklyReportResponse } from "../../../app/services/toggle/dto/Report/WeeklyReportResponse";
import { WeeklyReport } from "../../types";
import { fromProjectResponseToProjectAndClient } from "../../../app/helpers/fromProjectResponseToProjectsAndClient";

export function transformTogglWeeklyReport({
  total_grand,
  data,
}: WeeklyReportResponse): WeeklyReport {
  const { projects, client } = fromProjectResponseToProjectAndClient(data);
  return {
    worked: total_grand,
    left: 0,
    client,
    projects,
    weekHours: 35,
  };
}
