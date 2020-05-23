import React, { useState, ChangeEvent, FormEventHandler } from "react";

const generateOnInputChange = (
  setState: React.Dispatch<React.SetStateAction<string>>,
) => (event: ChangeEvent<HTMLInputElement>) =>
  setState(event.currentTarget.value);

export function Login({ onSubmit }: { onSubmit: FormEventHandler }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = generateOnInputChange(setUsername);
  const onChangePassword = generateOnInputChange(setPassword);

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
      <button type="submit">START</button>
    </form>
  );
}
