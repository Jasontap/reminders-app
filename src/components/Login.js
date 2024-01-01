import React, { useState } from "react";
import {loginUser, registerUser} from '../http-methods';

function Login({setToken, navigate, signUp=false}) {
  const [email, setEmail] = useState('');
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
  
  async function signUpUser(e) {
    e.preventDefault();
    if (password === pwConfirm) {
      // if (password.length >= 8) {
        console.log('hitting here')
        const response = await registerUser({username, email, password});
        
        if (response.error) {
          setError(response.message);
        } else {
          setToken(response.data);
          window.localStorage.setItem("token", response.data);
          navigate("/todos");
        }
      // } else {
      //   setError('Passord is not long enough.');
      // }
    } else {
      setError('Passwords do not match.');
    }
  }
  
  return (
    <form>
      {signUp &&
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      }
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
          <button onClick={(e) => signUpUser(e)}>signUp</button>
        </>
      ) : (
        <button onClick={(e) => login(e)}>login</button>
      )}
      {error && <div>{error}</div>}
    </form>
  );
}

export default Login;
