interface CurrencyAmount {
  currency: null | number;
  amount: null | number;
}

interface TitleReport {
  client: string;
  project: string;
  color: string;
  hex_color: string;
}

interface ProjectItemSummaryReport {
  title: {
    time_entry: string;
  };
  time: number;
  cur: null;
  sum: null;
  rate: null;
}

interface ProjectSummaryReport {
  id: string;
  title: TitleReport;
  time: number;
  total_currencies: CurrencyAmount[];
  items: ProjectItemSummaryReport[];
}

export interface SummaryReportResponse {
  total_grand: number;
  total_billable: number;
  total_currencies: CurrencyAmount[];
  data: ProjectSummaryReport[];
}
