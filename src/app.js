import React, {useState, useEffect, createContext} from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material'
import './App.css';
import {
  fetchUsersTodoLists,
  fetchAllUsersTodos
} from './http-methods';

import {
  Login,
  Lists,
  Todos,
  WelcomePage,
} from './components';

import {
  TokenContext,
  UsersTodoLists
} from './Context';


function NoPage() {
  return (
    <Link to={"/"}>Click to go Home</Link>
  )
}


function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [todoLists, setTodoLists] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [todosToDisplay, setTodosToDisplay] = useState([]);
  
  const navigate = useNavigate();
  
  function localTokenCheck() {
    const storedToken = window.localStorage.getItem('token');
    
    if (storedToken) {
      setToken(storedToken);
    } 
  }
  
  function logOut() {
    setToken('');
    window.localStorage.setItem('token', '');
  }
  
  async function getUsersTodoLists() {
    const todoFetchResults = await fetchUsersTodoLists(token);
    todoFetchResults.error ? logOut() : setTodoLists(todoFetchResults.data);
    const todos = await fetchAllUsersTodos(token);
    setAllTodos(todos.data);
  }

  useEffect(() => {
    localTokenCheck();
  }, []);
  
  useEffect(() => {
    if (token) {
      getUsersTodoLists();
    }
  }, [token]);
  
  return (
    <div>
      {!token && (
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route
            exact
            path="/login"
            element={<Login setToken={setToken} navigate={navigate} />}
          />
          <Route
            exact
            path="/signup"
            element={
              <Login setToken={setToken} navigate={navigate} signUp={true} />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      )}

      {token && (
        <UsersTodoLists.Provider value={todoLists}>
          <TokenContext.Provider value={token}>
            <Button variant="outlined" onClick={() => logOut()}>Log Out</Button>
            <Lists
              todoLists={todoLists}
              setTodosToDisplay={setTodosToDisplay}
            />
            <Routes>
              <Route
                exact
                path="/lists/:listId"
                element={
                  <Todos
                    todosToDisplay={todosToDisplay}
                    navigate={navigate}
                    getUsersTodoLists={getUsersTodoLists}
                    setTodosToDisplay={setTodosToDisplay}
                    todoLists={todoLists}
                  />
                }
              />
            </Routes>
          </TokenContext.Provider>
        </UsersTodoLists.Provider>
      )}
    </div>
  );
}

export default App;
