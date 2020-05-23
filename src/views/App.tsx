import React, { useState, FormEvent, ChangeEvent, MouseEvent } from "react";
import { hot } from "react-hot-loader/root";
import { ipcRenderer } from "electron";

import "./style.css";
import { Login } from "./components/Login";
import { SelectClient } from "./components/SelectClient";
import { useElectronListener } from "./hooks/useElectronListener";

const generateOnInputChange = (
  setState: React.Dispatch<React.SetStateAction<string>>,
) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setState(event.currentTarget.value);
};

const reduceLoginForm = (acc: object, { name, value }: HTMLInputElement) =>
  ["username", "password"].includes(name) ? { ...acc, [name]: value } : acc;

function App() {
  const { user, clients, weekly } = useElectronListener();
  const [selectedClient, setSelectedClient] = useState("");
  const onChangeSelectClient = generateOnInputChange(setSelectedClient);

  const onSubmitLogin = (event: FormEvent) => {
    event.preventDefault();
    const loginData = Array.from(event.currentTarget.children).reduce(
      reduceLoginForm,
      {},
    );
    ipcRenderer.send("login-request", loginData);
  };

  const onClickWeeklyButton = (event: MouseEvent) => {
    ipcRenderer.send("client-weekly-report-request", selectedClient);
  };

  return (
    <main>
      {!!user?.image_url && <img src={user.image_url} alt={user.fullname} />}
      {Object.keys(user).length === 0 ? (
        <Login onSubmit={onSubmitLogin} />
      ) : (
        <>
          {!!clients && Object.keys(clients).length && (
            <SelectClient
              clients={Object.values(clients)}
              onChange={onChangeSelectClient}
            />
          )}
          {!!selectedClient && clients[selectedClient].name}
          {!!selectedClient && (
            <div>
              <button onClick={onClickWeeklyButton}>WEEKLY</button>
            </div>
          )}
          <div>
            {!!weekly && (
              <pre>
                <code>{JSON.stringify(weekly, null, 2)}</code>
              </pre>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default hot(App);
