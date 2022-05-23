import { useState } from "react";
import { API } from "../App";

const Login = ({
  token,
  username,
  setUsername,
  password,
  setPassword,
  setToken,
}) => {
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const resp = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const info = await resp.json();
    if (info.success == false) {
      return setError(info.error.message);
    }
    setToken(info.data.token);
    localStorage.setItem("token", info.data.token);
    return setError("You are logged in");
  };

  return (
    <span>
      <h1>Login:</h1>
      <form onSubmit={handleLogin}>
        <input
          required
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          required
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Login</button>
      </form>
      <p>{error}</p>
      <form
        onSubmit={() => {
          history.push("/register");
        }}
      >
        <button type="submit">Need to create an account?</button>
      </form>
    </span>
  );
};
export default Login;
