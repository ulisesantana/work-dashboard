import React from "react";
import { hot } from "react-hot-loader/root";

import StyleWrapper from "./style";
import "./style.css";
import { ClientWeeklyDashboard, Login, Logout } from "./components";
import { useElectronListener } from "./hooks";
import { LastDayReport } from "./components/LastDayReport/LastDayReport";

function App() {
  const { user, clients } = useElectronListener();

  return (
    <StyleWrapper>
      {Object.keys(user).length === 0 ? (
        <Login />
      ) : (
        <>
          <Logout />

          {!!clients && Object.keys(clients).length && (
            <div>
              <ClientWeeklyDashboard clients={clients} />
            </div>
          )}

          <LastDayReport />
        </>
      )}
    </StyleWrapper>
  );
}

export default hot(App);
