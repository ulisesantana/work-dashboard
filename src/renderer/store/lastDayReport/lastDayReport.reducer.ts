import {
  LastDayReportAction,
  LastDayReportActions,
  LastDayReportPayload,
} from "./lastDayReport.actions";
import { TimeEntry, ViewLastDayReport } from "../../types";

const initialState = {
  total: "0",
  entries: [] as TimeEntry[],
};

export function lastDayReportReducer(
  state = initialState,
  action: { type: LastDayReportActions; payload: LastDayReportPayload },
): ViewLastDayReport {
  switch (action.type) {
    case LastDayReportActions.SET_LAST_DAY_REPORT:
      console.debug("lastDayReportReducer", action.payload);
      return action.payload as ViewLastDayReport;
    case LastDayReportActions.GET_LAST_DAY_REPORT:
    default:
      return state;
  }
}
