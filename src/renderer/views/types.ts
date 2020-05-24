export interface WeeklyReport {
  worked: number;
  left: number;
  client: string;
  projects: string[];
}

export interface ViewWeeklyReport {
  workedHours: string;
  leftHours: string;
  percentageWorked: number;
  client: string;
  projects: string[];
}
