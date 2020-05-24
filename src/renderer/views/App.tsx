import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";

import StyleWrapper from "./style";
import "./style.css";
import {
  ClientWeeklyDashboard,
  Login,
  Logout,
  SelectClient,
} from "./components";
import { useElectronListener } from "./hooks";
import { generateOnInputChange, updateClientWeeklyReport } from "./handlers";
import { InputRange } from "./components/atoms";
import { fromMsToHumanTime } from "../../app/helpers/fromMsToHumanTime";
import { ViewWeeklyReport, WeeklyReport } from "./types";

const transformWeekly = (weekly: WeeklyReport, totalHours: number) => {
  const totalHoursInMs = totalHours * (1000 * 60 * 60);
  const worked = weekly.worked || 0;
  const leftHours = worked - totalHoursInMs;
  return {
    ...weekly,
    workedHours: fromMsToHumanTime(worked),
    leftHours: fromMsToHumanTime(-leftHours),
    percentageWorked: Number(((worked / totalHoursInMs) * 100).toFixed(2)),
  };
};

function App() {
  const { user, clients, weekly } = useElectronListener();
  const [weeklyHours, setWeeklyHours] = useState("40");
  const [viewWeekly, setViewWeekly] = useState<ViewWeeklyReport>(
    {} as ViewWeeklyReport,
  );
  const onActiveClientChange = (clientId: string) =>
    updateClientWeeklyReport(clients[clientId]);
  const handleOnWeeklyHoursChange = generateOnInputChange(setWeeklyHours);

  useEffect(() => {
    setViewWeekly(transformWeekly(weekly, +weeklyHours));
  }, [weeklyHours, weekly]);

  return (
    <StyleWrapper>
      {Object.keys(user).length === 0 ? (
        <Login />
      ) : (
        <>
          <Logout />
          {!!clients && Object.keys(clients).length && (
            <SelectClient
              onClientChange={onActiveClientChange}
              clients={Object.values(clients)}
            />
          )}

          {!!viewWeekly && (
            <div>
              <span>
                Horas a la semana: {weeklyHours} &nbsp;
                <InputRange
                  value={weeklyHours}
                  onChange={handleOnWeeklyHoursChange}
                  min={1}
                  max={40}
                />
              </span>
              <ClientWeeklyDashboard {...viewWeekly} />
            </div>
          )}
        </>
      )}
    </StyleWrapper>
  );
}

export default hot(App);
