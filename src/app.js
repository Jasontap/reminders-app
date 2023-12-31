import React, {useState, useEffect, createContext} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import {
  fetchUsersTodoLists,
  fetchAllUsersTodos
} from './http-methods';

import {
  Login,
  Lists,
  Todos,
  EditTodo
} from './components';

import {
  TokenContext,
  UsersTodoLists
} from './Context';


function NoPage() {
  return <div>NO PAGE HERE</div>
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
      {!token && <Login setToken={setToken} navigate={navigate} />}

      {token && (
        <UsersTodoLists.Provider value={todoLists}>
          <TokenContext.Provider value={token}>
            <button onClick={() => logOut()}>Log Out</button>
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
              <Route
                exact
                path="/lists/:listId/todo/:todoId/edit"
                element={<EditTodo />}
              />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </TokenContext.Provider>
        </UsersTodoLists.Provider>
      )}
    </div>
  );
}

export default App;
