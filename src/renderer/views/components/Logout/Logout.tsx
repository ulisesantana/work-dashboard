import React, { useState, FormEvent } from "react";
import { generateOnInputChange } from "../../handlers";
import { ipcRenderer } from "electron";
import { BrowserStore } from "../../helpers";
import { LogOut as LogOutIcon } from "@styled-icons/feather/LogOut";
import StyleWrapper from "./Logout.styled";

export function Logout() {
  const onClick = () => {
    BrowserStore.reset();
    location.reload();
  };
  return (
    <StyleWrapper>
      <button onClick={onClick}>
        <LogOutIcon size="36" />
      </button>
    </StyleWrapper>
  );
}
