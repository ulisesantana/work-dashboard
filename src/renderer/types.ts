import { WeeklyReportState } from "./store/weeklyReports";

export interface WeeklyReport {
  worked: number;
  left: number;
  client: string;
  projects: string[];
  weekHours: number;
}

export interface ViewWeeklyReport {
  workedHours: string;
  leftHours: string;
  percentageWorked: number;
  client: string;
  projects: string[];
  weekHours: number;
}

export interface TimeEntry {
  client: string;
  project: string;
  hex_color: string;
  time_entry: string;
  time: string;
}

export interface ViewLastDayReport {
  total: string;
  entries: TimeEntry[];
}

export interface User {
  id: string;
  token: string;
  workspaceId: string;
  email: string;
  name: string;
}

export interface Client {
  id: string;
  name: string;
  wid: string;
  weeklyGoal: number;
}

export interface State {
  user: User;
  weeklyReports: WeeklyReportState;
  lastDayReport: ViewLastDayReport;
}
