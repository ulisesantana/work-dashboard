import { Client } from "../Client";

export interface WeeklyClientReport {
  client: Client;
  totalTime: number;
  remainTime: number;
}
