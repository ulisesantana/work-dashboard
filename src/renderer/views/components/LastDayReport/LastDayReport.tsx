import React from "react";
import StyleWrapper from "./LastDayReport.styled";
import { useSelector } from "react-redux";
import { State } from "../../../types";

export function LastDayReport() {
  const { total, entries } = useSelector((state: State) => state.lastDayReport);
  return (
    <StyleWrapper>
      <h3>Último día: {total}</h3>
      {Boolean(entries.length) ? (
        <ul className="entries">
          {!!entries?.length &&
            entries.map(({ time_entry, hex_color, project, client, time }) => (
              <li style={{ borderColor: hex_color }} key={time_entry + project}>
                <span className="entry">
                  <h3>{time_entry}</h3>
                </span>
                <span className="time">{time}</span>
                <span className="client">
                  {client} - {project}
                </span>
              </li>
            ))}
        </ul>
      ) : (
        <span>No data</span>
      )}
    </StyleWrapper>
  );
}
