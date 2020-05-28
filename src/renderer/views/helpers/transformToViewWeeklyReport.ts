import { WeeklyReport } from "../../types";
import { fromMsToHumanTime } from "../../../app/helpers/fromMsToHumanTime";

export const transformToViewWeeklyReport = (weekly: WeeklyReport) => {
  const totalHoursInMs = weekly.weekHours * (1000 * 60 * 60);
  const worked = weekly.worked || 0;
  const leftHours = worked - totalHoursInMs;
  return {
    ...weekly,
    workedHours: fromMsToHumanTime(worked),
    leftHours: fromMsToHumanTime(-leftHours),
    percentageWorked: Number(((worked / totalHoursInMs) * 100).toFixed(2)),
  };
};
