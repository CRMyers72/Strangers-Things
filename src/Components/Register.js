import { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../App";

const Register = ({
  setToken,
  username,
  setUsername,
  password,
  setPassword,
  history,
}) => {
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    } else if (password.length < 8) {
      setError("Password must be eight characters or more");
    }
    const resp = await fetch(`${API}/users/register`, {
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
    return setError("Registration Successful!");
  };

  return (
    <b>
      <h1>Register: </h1>
      <form onSubmit={handleRegister}>
        <input
          required
          placeholder="Enter username.."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          placeholder="Enter password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          placeholder="Confirm password.."
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button>Register</button>
      </form>
      <p>{error}</p>
      <form
        onSubmit={() => {
          history.push("/login");
        }}
      >
        <button type="submit">Already have an account?</button>
      </form>
    </b>
  );
};

export default Register;
