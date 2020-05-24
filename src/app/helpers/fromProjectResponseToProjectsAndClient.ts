import {ProjectReport} from "../services/toggle/dto/Report/ReportResponse";

export function fromProjectResponseToProjectAndClient(data: ProjectReport[]) {
    return  data.reduce(
        (acc, {title}: ProjectReport) => ({
            projects: acc.projects.includes(title.project)
                ? acc.projects
                : acc.projects.concat(title.project),
            client: title.client
        }),
        {projects: [] as string[], client: ""}
    );
}