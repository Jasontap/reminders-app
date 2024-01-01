import React, { useState } from "react";
import {loginUser} from '../http-methods';

function Login({setToken, navigate, signUp=false}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setPWConfirm] = useState('');
  const [error, setError] = useState('');
  
  async function login(e) {
    e.preventDefault();
    const response = await loginUser({username, password});

    if (response.error) {
      setError(response.message);
    } else {
      setToken(response.data);
      window.localStorage.setItem('token', response.data);
      navigate('/todos')
    }
  }
  
  async function registerUser(e) {
    e.preventDefault();
    if (password === pwConfirm) {
      // setup signup functionality
    } else {
      setError('Passwords do not match.')
    }
  }
  
  return (
    <form>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      {signUp ? (
        <>
          <input
            type="password"
            onChange={(e) => setPWConfirm(e.target.value)}
            placeholder="confirm password"
          />
          <button onClick={(e) => registerUser(e)}>signUp</button>
        </>
      ) : (
        <button onClick={(e) => login(e)}>login</button>
      )}
      {error && <div>{error}</div>}
    </form>
  );
}

export default Login;
