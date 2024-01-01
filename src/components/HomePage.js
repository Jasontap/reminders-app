import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../http-methods";

function HomePage({ setToken, navigate }) {
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
    <form>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      {error && <div>{error}</div>}
    </form>
  );
}

export default HomePage;
