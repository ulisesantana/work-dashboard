import { ViewLastDayReport } from "../../types";
import { ipcRenderer } from "electron";

export enum LastDayReportActions {
  GET_LAST_DAY_REPORT = "GET_LAST_DAY_REPORT",
  SET_LAST_DAY_REPORT = "SET_LAST_DAY_REPORT",
}

export interface LastDayReportAction {
  type: LastDayReportActions;
  payload: LastDayReportPayload;
}

export type SetLastDayReportPayload = ViewLastDayReport;

export type LastDayReportPayload = SetLastDayReportPayload;

const actionCreator = (type: LastDayReportActions) => (
  payload?: LastDayReportPayload,
) =>
  payload
    ? {
        type,
        payload,
      }
    : { type };

export const getLastDayReport = (workspaceId: string) => {
  ipcRenderer.send("last-day-report-request", workspaceId);
  return actionCreator(LastDayReportActions.GET_LAST_DAY_REPORT)();
};

export const setLastDayReport = actionCreator(
  LastDayReportActions.SET_LAST_DAY_REPORT,
);
