import { combineReducers, createStore } from "redux";
import { lastDayReportReducer } from "./lastDayReport";
import { weeklyReportsReducer } from "./weeklyReports";

// const initialState: State = {
//   user: {} as User,
//   weeklyReports: {
//     data: [],
//     loading: false,
//     error: "",
//   },
//
// };

export const store = createStore(
  combineReducers({
    lastDayReport: lastDayReportReducer,
    weeklyReports: weeklyReportsReducer,
  }),
);
