import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { State } from "../../../types";
import StyleWrapper from "./ClientWeeklyDashboard.styled";
import { Pill } from "../atoms/Pill";
import { InputRange, Spinner } from "../atoms";
import { SelectClient } from "../SelectClient";
import { generateOnInputChange } from "../../handlers";
import { useDispatch, useSelector } from "react-redux";
import { TogglClient } from "../../../../app/services/toggle/entities";
import {
  getWeeklyReports,
  updateWeeklyReports,
} from "../../../store/weeklyReports";
import { Reload } from "../atoms/Reload";
import { transformToViewWeeklyReport } from "../../helpers";

interface ClientWeeklyDashboardProps {
  clients: Record<string, TogglClient>;
}

export function ClientWeeklyDashboard({ clients }: ClientWeeklyDashboardProps) {
  const [client, setClient] = useState(Object.values(clients)[0]);
  const [hours, setHours] = useState("35");
  const { data, loading } = useSelector((state: State) => state.weeklyReports);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeklyReports(client));
  }, []);

  useEffect(() => {
    const rawReport = data[client?.name];
    if (rawReport) {
      setHours(String(rawReport.weekHours));
    }
  }, [client]);

  const report =
    (data[client?.name] && transformToViewWeeklyReport(data[client?.name])) ||
    {};
  const onClickReload = useCallback(
    () => dispatch(getWeeklyReports(client)),
    [],
  );
  const onChangeHours = useCallback(
    generateOnInputChange((newHours: string) => {
      setHours(newHours);
      dispatch(
        updateWeeklyReports({ weekHours: +newHours, client: client.name }),
      );
    }),
    [setHours, client],
  );
  const onChangeSelectClient = useCallback(
    generateOnInputChange((clientId: string) => {
      const newClient = clients[clientId];
      if (newClient) {
        setClient(newClient);
        dispatch(getWeeklyReports(newClient));
      }
    }),
    [setClient],
  );

  return (
    <>
      {!!Object.keys(report) && (
        <StyleWrapper {...report}>
          <div className="weekly-hours">
            <span>
              {loading ? (
                <Spinner size={24} />
              ) : (
                <Reload size={24} onClick={onClickReload} />
              )}{" "}
              &nbsp; Horas a la semana: {hours} &nbsp;
              <InputRange
                value={hours}
                onChange={onChangeHours}
                min={1}
                max={40}
              />
            </span>
            <SelectClient
              selected={client?.id}
              onClientChange={onChangeSelectClient}
              clients={Object.values(clients)}
            />
          </div>
          <div className="progress">
            <span />
          </div>
          <div className="worked">
            <div>
              <small>Horas hechas: &nbsp;</small>
              <div>{report.workedHours}</div>
            </div>
            <div>
              <div>{report.percentageWorked}%</div>
            </div>
          </div>
          <div className="left">
            <small>Faltan: &nbsp;</small>
            <div>{report.leftHours}</div>
          </div>
          <ul className="projects">
            {!!report.projects &&
              report.projects.map((project) => (
                <li className="project" key={project}>
                  <Pill>{project}</Pill>
                </li>
              ))}
          </ul>
        </StyleWrapper>
      )}
    </>
  );
}
