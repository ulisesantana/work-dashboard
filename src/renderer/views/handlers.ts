import React, {ChangeEvent} from "react";
import {ipcRenderer} from "electron";
import {TogglClient} from "../../app/services/toggle/entities";

export const generateOnInputChange = (
    setState: React.Dispatch<React.SetStateAction<string>>,
) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState(event.currentTarget.value);
};

export const updateClientWeeklyReport = (client: TogglClient) => {
    console.debug('updateClientWeeklyReport', client)
    ipcRenderer.send("client-weekly-report-request", client);
}