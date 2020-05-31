import { SelectClient } from "../components/SelectClient";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../types";
import {
  getWeeklyReports,
  updateWeeklyReports,
} from "../../store/weeklyReports";
import { transformToViewWeeklyReport } from "../helpers";
import { generateOnInputChange } from "../handlers";
import { TogglClient } from "../../../app/services/toggle/entities";
import { ClientWeeklyDashboard } from "../components/ClientWeeklyDashboard";
import StyledWrapper from "./WeeklyDashboard.styled";

interface WeeklyDashboardProps {
  clients: Record<string, TogglClient>;
}

export function WeeklyDashboard({ clients }: WeeklyDashboardProps) {
  const { data: reports, loading } = useSelector(
    (state: State) => state.weeklyReports,
  );
  const dispatch = useDispatch();
  const clientsByName: Record<string, TogglClient> = useMemo(
    () =>
      Object.values(clients).reduce(
        (acc, client) => ({
          ...acc,
          [client.name]: client,
        }),
        {},
      ),
    [clients],
  );
  //
  // useEffect(() => {
  //     dispatch(getWeeklyReports(client));
  // }, []);

  const onChangeSelectClient = useCallback(
    generateOnInputChange((clientId: string) => {
      const newClient = clients[clientId];
      if (newClient) {
        dispatch(getWeeklyReports(newClient));
      }
    }),
    [],
  );

  // const onReload = () => dispatch(getWeeklyReports(client))

  return (
    <StyledWrapper>
      <div className="form">
        <SelectClient
          onClientChange={onChangeSelectClient}
          clients={Object.values(clients)}
        />
      </div>
      <div className="reports">
        {!!Object.values(reports).length &&
          Object.values(reports).map((report) => (
            <ClientWeeklyDashboard
              key={report.client}
              report={transformToViewWeeklyReport(report)}
              loading={loading}
              onReload={() =>
                dispatch(
                  getWeeklyReports(
                    clientsByName[report.client]! as TogglClient,
                  ),
                )
              }
              onChange={generateOnInputChange((newHours: string) => {
                dispatch(
                  updateWeeklyReports({
                    weekHours: +newHours,
                    client: report.client,
                  }),
                );
              })}
            />
          ))}
      </div>
    </StyledWrapper>
  );
}
