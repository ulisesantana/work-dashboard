import {
  UpdateWeeklyReportsPayload,
  WeeklyReportsActions,
  WeeklyReportsPayload,
} from "./weeklyReports.actions";
import { ViewLastDayReport, ViewWeeklyReport, WeeklyReport } from "../../types";
import { act } from "react-dom/test-utils";
import { transformToViewWeeklyReport } from "../../views/helpers";

const reduceEntriesToRecord = <T>(entries: [string, T][]): Record<string, T> =>
  entries.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

export interface WeeklyReportState {
  data: Record<string, WeeklyReport>;
  loading: boolean;
}

const initialState: WeeklyReportState = {
  data: {},
  loading: false,
};

export function weeklyReportsReducer(
  state = initialState,
  action: { type: WeeklyReportsActions; payload: WeeklyReportsPayload },
): WeeklyReportState {
  console.debug("weeklyReportsReducer STORE before update:", state);
  switch (action.type) {
    case WeeklyReportsActions.SET_WEEKLY_REPORT: {
      console.debug("weeklyReportsReducer.SET_WEEKLY_REPORT", state);
      const { client } = action.payload as WeeklyReport;
      const stateClient = state.data[client] as WeeklyReport;

      if (stateClient) {
        return {
          loading: false,
          data: {
            ...state.data,
            [client]: {
              ...(action.payload as WeeklyReport),
              weekHours: stateClient.weekHours,
            },
          },
        };
      } else {
        return {
          loading: false,
          data: {
            ...state.data,
            [client]: action.payload as WeeklyReport,
          },
        };
      }
    }
    case WeeklyReportsActions.UPDATE_WEEKLY_REPORT: {
      console.debug(
        "weeklyReportsReducer.UPDATE_WEEKLY_REPORT",
        action.payload,
      );
      const {
        client,
        weekHours,
      } = action.payload as UpdateWeeklyReportsPayload;
      if (!!client) {
        const stateClient = state.data[client] as WeeklyReport;
        return {
          loading: false,
          data: {
            ...state.data,
            [client]: {
              ...stateClient,
              weekHours: weekHours!,
            },
          },
        };
      } else {
        return state;
      }
    }
    case WeeklyReportsActions.DELETE_WEEKLY_REPORT:
      return {
        loading: false,
        data: reduceEntriesToRecord(
          Object.entries(state.data).filter(([k]) => k !== action.payload),
        ),
      };
    case WeeklyReportsActions.GET_WEEKLY_REPORT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
