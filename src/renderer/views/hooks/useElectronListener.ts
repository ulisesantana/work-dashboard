import {useEffect, useState} from "react";
import {User, TogglClient} from "../../../app/services/toggle/entities";
import {BrowserStore} from "../helpers";
import {ipcRenderer} from "electron";
import {WeeklyReport} from "../App";

export function useElectronListener() {
    const [user, setUser] = useState<Partial<User>>({});
    const [clients, setClients] = useState<Record<string, TogglClient>>({});
    const [weekly, setWeekly] = useState<WeeklyReport>({});

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

        ipcRenderer.on("login-response", (event, {data}) => {
            setUser(data);
            BrowserStore.set("user", data);
            setTimeout(() => {
                ipcRenderer.send("clients-get-request");
            }, 2000)
            console.debug("Retrieving user info from API", data);
        });

        ipcRenderer.on("clients-get-response", (event, data: TogglClient[]) => {
            const newClients = data.reduce(
                (acc, client) => ({...acc, [client.id]: client}),
                {} as Record<string, TogglClient>,
            );
            setClients(newClients);
            BrowserStore.set("clients", newClients);
            console.debug("Retrieving clients from API", newClients);
        });

        ipcRenderer.on("client-weekly-report-response", (event, data) => {
            setWeekly(data);
            console.debug("Retrieving client weekly report from API", data);
        });
    }, []);



    return {
        user,
        clients,
        weekly,
    };
}
