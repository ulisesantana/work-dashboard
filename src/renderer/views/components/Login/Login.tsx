import React, { useState, FormEvent, FormEventHandler } from "react";
import { generateOnInputChange } from "../../handlers";
import { ipcRenderer } from "electron";

let counter = 0;

const reduceLoginForm = (acc: object, { name, value }: HTMLInputElement) =>
  ["username", "password"].includes(name) ? { ...acc, [name]: value } : acc;

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = generateOnInputChange(setUsername);
  const onChangePassword = generateOnInputChange(setPassword);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.debug("login");
    const loginData = Array.from(event.currentTarget.children).reduce(
      reduceLoginForm,
      {},
    );
    ipcRenderer.send("login-request", loginData);
  };

  console.debug("Rendering: ", ++counter);

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        placeholder={"Email que usas en toggl"}
        type="text"
        defaultValue={username}
        onChange={onChangeUsername}
      />
      <input
        name="password"
        placeholder={"Contraseña"}
        type="password"
        defaultValue={password}
        onChange={onChangePassword}
      />
      <button type="submit">Login</button>
    </form>
  );
}
