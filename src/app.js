import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  fetchUsersTodoLists,
  fetchAllUsersTodos
} from './http-methods'

import {
  Login,
  Lists,
  Todos
} from './components'


function NoPage() {return <div>NO PAGE HERE</div>}


function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [todoLists, setTodoLists] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  
  const navigate = useNavigate();
  
  function localTokenCheck() {
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
  
  async function getUsersTodoLists() {
    setTodoLists(await fetchUsersTodoLists(token));
    setAllTodos(await fetchAllUsersTodos(token));
  }

  useEffect(() => {
    localTokenCheck();
  }, []);
  
  useEffect(() => {
    if (token) {
      getUsersTodoLists();
    }
  }, [token])
  
  return (
    <div>
      {
        !token && <Login setToken={setToken} navigate={navigate}/>
      }
          <Routes>
            <Route 
              path='/todos/:todo-id'
              element={<Todos allTodos={allTodos}/>}
            />
            <Route path='*' element={<NoPage />} />
          </Routes>
      {
        token 
          && 
        <div>
          <button onClick={() => logOut()}>Log Out</button>
          <Lists todoLists={todoLists} setAllTodos={setAllTodos}/>
        </div>
      }
    </div>
  )
}

export default App;
