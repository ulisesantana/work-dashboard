import {Client} from "./Client";
import {Project} from "./Project";

export interface WeeklyReport {
    worked: number
    left: number
    client: Client
    projects: Project[]
}