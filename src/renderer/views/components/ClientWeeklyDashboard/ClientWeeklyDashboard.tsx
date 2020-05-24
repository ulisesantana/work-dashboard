import React from "react";
import { ViewWeeklyReport } from "../../types";
import StyleWrapper from "./ClientWeeklyDashboard.styled";

export function ClientWeeklyDashboard(props: ViewWeeklyReport) {
  return (
    <StyleWrapper {...props}>
      <div className="progress">
        <span />
      </div>
      <div className="worked">
        <div>
          <small>Horas hechas: &nbsp;</small>
          <div>{props.workedHours}</div>
        </div>
        <div>
          <div>{props.percentageWorked}%</div>
        </div>
      </div>
      <div className="left">
        <small>Faltan: &nbsp;</small>
        <div>{props.leftHours}</div>
      </div>
      <ul className="projects">
        {!!props.projects &&
          props.projects.map((project) => (
            <li className="project" key={project}>
              {project}
            </li>
          ))}
      </ul>
    </StyleWrapper>
  );
}
