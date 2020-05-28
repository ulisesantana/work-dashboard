import { WeeklyReport } from "../../types";
import { ipcRenderer } from "electron";
import { TogglClient } from "../../../app/services/toggle/entities";

export enum WeeklyReportsActions {
  GET_WEEKLY_REPORT = "GET_WEEKLY_REPORT",
  SET_WEEKLY_REPORT = "SET_WEEKLY_REPORT",
  UPDATE_WEEKLY_REPORT = "UPDATE_WEEKLY_REPORT",
  DELETE_WEEKLY_REPORT = "DELETE_WEEKLY_REPORT",
}

export interface WeeklyReportsAction {
  type: WeeklyReportsActions;
  payload: WeeklyReportsPayload;
}

export type SetWeeklyReportsPayload = WeeklyReport;
export type UpdateWeeklyReportsPayload = Partial<WeeklyReport>;
export type DeleteWeeklyReportsPayload = string;

export type WeeklyReportsPayload =
  | SetWeeklyReportsPayload
  | UpdateWeeklyReportsPayload
  | DeleteWeeklyReportsPayload;

const actionCreator = (type: WeeklyReportsActions) => (
  payload?: WeeklyReportsPayload,
) => ({
  type,
  payload,
});

export const getWeeklyReports = (client: TogglClient) => {
  ipcRenderer.send("client-weekly-report-request", client);

  return actionCreator(WeeklyReportsActions.GET_WEEKLY_REPORT)();
};

export const setWeeklyReports = actionCreator(
  WeeklyReportsActions.SET_WEEKLY_REPORT,
);

// TODO: FALTA UPDATE Y DELETE
export const updateWeeklyReports = actionCreator(
  WeeklyReportsActions.UPDATE_WEEKLY_REPORT,
);
export const deleteWeeklyReports = actionCreator(
  WeeklyReportsActions.DELETE_WEEKLY_REPORT,
);
