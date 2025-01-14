import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../http-methods";
import { Button } from "@mui/material";

function WelcomePage({ setToken, navigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPWConfirm] = useState("");
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    const response = await loginUser({ username, password });

    if (response.error) {
      setError(response.message);
    } else {
      setToken(response.data);
      window.localStorage.setItem("token", response.data);
      navigate("/todos");
    }
  }

  return (
    <div>
      <h1>Todo App</h1>
      <form>
        <Button variant="contained" color="ochre" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="contained" color="ochre" onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default WelcomePage;
