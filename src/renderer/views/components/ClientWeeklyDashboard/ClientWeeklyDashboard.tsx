import React, { ChangeEventHandler } from "react";
import { ViewWeeklyReport } from "../../../types";
import StyleWrapper from "./ClientWeeklyDashboard.styled";
import { Pill } from "../atoms/Pill";
import { InputRange, Spinner } from "../atoms";
import { Reload } from "../atoms/Reload";
import { Trash } from "@styled-icons/zondicons/Trash";

interface ClientWeeklyDashboardProps {
  report: ViewWeeklyReport;
  onChange: ChangeEventHandler;
  onReload?: () => void;
  loading: boolean;
}

export function ClientWeeklyDashboard({
  report,
  onChange,
  onReload = () => console.log("Reloading..."),
  loading,
}: ClientWeeklyDashboardProps) {
  const hours = report.weekHours || "35";

  return (
    <>
      {!!Object.keys(report) && (
        <StyleWrapper {...report}>
          <div className="weekly-hours">
            <InputRange value={hours} onChange={onChange} min={1} max={40} />
            &nbsp; {hours} &nbsp;
          </div>
          <div className="progress">
            <span />
          </div>
          <div className="worked">
            <small>{report.workedHours}</small>
            <div>{report.percentageWorked}%</div>
          </div>
          <div className="menu">
            {loading ? (
              <Spinner size={24} />
            ) : (
              <Reload size={24} onClick={onReload} />
            )}{" "}
            <Trash size={24} />
          </div>
          <div className="projects">
            <h3>{report.client}</h3>

            <div className="left-time">
              <span>{report.leftHours}</span>
            </div>
            <ul>
              {!!report.projects &&
                report.projects.map((project) => (
                  <li className="project" key={project}>
                    <Pill>{project}</Pill>
                  </li>
                ))}
            </ul>
          </div>
        </StyleWrapper>
      )}
    </>
  );
}
