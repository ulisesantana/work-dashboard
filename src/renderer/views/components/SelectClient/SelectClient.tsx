import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TogglClient } from "../../../../app/services/toggle";
import { generateOnInputChange } from "../../handlers";
import StyledSelect from "./SelectClient.styled";

export interface SelectClientProps {
  clients: TogglClient[];
  selected: string;
  onClientChange: ChangeEventHandler;
}

export function SelectClient({
  clients,
  onClientChange,
  selected,
}: SelectClientProps) {
  return (
    <StyledSelect onChange={onClientChange} value={selected}>
      {clients.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </StyledSelect>
  );
}
