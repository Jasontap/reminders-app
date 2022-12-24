import React, {useState, useEffect} from 'react';
import {
  Login
} from './components'

function App() {
  const [token, setToken] = useState('');
  
  function isLoggedIn() {
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) {
      console.log('user is logged in already')
    } else {
      console.log('user is not logged in yet')
    }
  }
  
  useEffect(() => {
    isLoggedIn();
  }, []);
  
  return (
    <div>
      <Login setToken={setToken}/>
    </div>
  )
}

export default App;
