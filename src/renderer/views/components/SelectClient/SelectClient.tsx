import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TogglClient } from "../../../../app/services/toggle";
import { generateOnInputChange } from "../../handlers";
import { ipcRenderer } from "electron";

export interface SelectClientProps {
  clients: TogglClient[];
  onClientChange: (clientId: string) => void;
}

export function SelectClient({ clients, onClientChange }: SelectClientProps) {
  const [client, setClient] = useState(clients[0].id);
  const onChangeSelectClient = useCallback(generateOnInputChange(setClient), [
    setClient,
  ]);

  useEffect(() => {
    onClientChange(client);
  }, [client]);

  return (
    <select onChange={onChangeSelectClient} value={client}>
      {clients.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
