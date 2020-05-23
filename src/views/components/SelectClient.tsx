import React, { ChangeEventHandler } from "react";
import { Client } from "../../toggle/Client";

export interface SelectClientProps {
  clients: Client[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export function SelectClient({ clients, onChange }: SelectClientProps) {
  return (
    <select onChange={onChange}>
      {clients.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
