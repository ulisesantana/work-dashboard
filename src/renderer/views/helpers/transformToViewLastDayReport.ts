import { SummaryReportResponse } from "../../../app/services/toggle/dto/Report/SummaryReportResponse";
import { TimeEntry, ViewLastDayReport } from "../../types";
import { fromMsToHumanTime } from "../../../app/helpers/fromMsToHumanTime";

export function transformToViewLastDayReport(
  report: SummaryReportResponse,
): ViewLastDayReport {
  return {
    total: fromMsToHumanTime(report.total_grand),
    entries: report.data.reduce(
      (acc: TimeEntry[], { title: { client, project, hex_color }, items }) =>
        acc.concat(
          items.map(({ title: { time_entry }, time }) => ({
            client,
            project,
            hex_color,
            time_entry,
            time: fromMsToHumanTime(time),
          })),
        ),
      [],
    ),
  };
}
