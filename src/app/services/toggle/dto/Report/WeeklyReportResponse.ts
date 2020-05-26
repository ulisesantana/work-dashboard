export interface ReportResponse {
    total_grand: number,
    total_billable: number,
    total_currencies:[{currency:null,amount:null}],
    data: ProjectReport[],
    week_totals: Array<number | null>
}

export interface ProjectReport {
    title: {
        client: string
        project: string
        color: string
        hex_color: string
    },
    pid: string,
    totals: Array<number | null> ,
    details: ProjectDetailReport[]
}

interface ProjectDetailReport         {
    uid: string,
    title: {
        user: string
    },
    totals: Array<number | null>
}