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
  const [todosToDisplay, setTodosToDisplay] = useState([]);
  
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
    const todos = await fetchAllUsersTodos(token);
    setAllTodos(todos.data)
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
      {!token && <Login setToken={setToken} navigate={navigate} />}

      {token && (
        <div>
          <button onClick={() => logOut()}>Log Out</button>
          <Lists todoLists={todoLists} setTodosToDisplay={setTodosToDisplay} />
          <Routes>
            <Route
              path="/lists/:listId"
              element={
                <Todos 
                  allTodos={allTodos} 
                  todosToDisplay={todosToDisplay} 
                  token={token}
                />
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
