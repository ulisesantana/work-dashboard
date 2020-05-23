import { useState, useEffect } from "react";
import { UserData, UserInfo } from "../../toggle/User";
import { Client } from "../../toggle/Client";
import { BrowserStore } from "../../toggle/helpers/store";
import { ipcRenderer } from "electron";

export function useElectronListener() {
  const [user, setUser] = useState<Partial<UserData>>({});
  const [clients, setClients] = useState<Record<string, Client>>({});
  const [weekly, setWeekly] = useState({});

  useEffect(() => {
    const storedUser = BrowserStore.get("user");
    const storedClients = BrowserStore.get("clients");

    if (storedUser) {
      ipcRenderer.send("api-token-update", storedUser);
      setUser(storedUser);
    }

    if (storedUser && !storedClients) {
      console.debug("Getting clients from API");
      ipcRenderer.send("clients-get-request");
    } else if (storedClients) {
      console.debug("Getting clients from localStorage");
      setClients(storedClients);
    }
  }, []);

  ipcRenderer.on("login-response", (event, { data }: UserInfo) => {
    setUser(data);
    BrowserStore.set("user", data);
    ipcRenderer.send("clients-get-request");
    console.debug("Retrieving user info from API", data);
  });

  ipcRenderer.on("clients-get-response", (event, data: Client[]) => {
    const newClients = data.reduce(
      (acc, client) => ({ ...acc, [client.id]: client }),
      {} as Record<string, Client>,
    );
    setClients(newClients);
    BrowserStore.set("clients", newClients);
    console.debug("Retrieving clients from API", newClients);
  });

  ipcRenderer.on("client-weekly-report-response", (event, data) => {
    setWeekly(data);
    console.debug("Retrieving client weekly report from API", data);
  });

  return {
    user,
    clients,
    weekly,
  };
}
