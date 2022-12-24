import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import {
  Login
} from './components'

function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  
  const navigate = useNavigate();
  
  function isLoggedIn() {
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      console.log('user is logged in already');
    } else {
      console.log('user is not logged in yet')
    }
  }
  
  function logOut() {
    setToken('');
    window.localStorage.setItem('token', '');
  }

  useEffect(() => {
    isLoggedIn();
  }, []);
  
  return (
    <div>
      {
        !token && <Login setToken={setToken} navigate={navigate}/>
      }
      {
        token && <button onClick={() => logOut()}>Log Out</button>
      }
    </div>
  )
}

export default App;
