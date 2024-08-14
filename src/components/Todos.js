import React, {useEffect, useState, createContext, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import AddTodoForm from './AddTodoForm';
import { destroyTodo, destroyList } from '../http-methods';
import { TokenContext } from '../Context';
import { EditTodo } from './';
import { Button } from '@mui/material';
import './CSS/todos.css';

function Todos({
  todosToDisplay,
  navigate,
  getUsersTodoLists,
  setTodosToDisplay,
  todoLists
}) {
  const [addTodo, setAddTodo] = useState(false);
  const [listDetails, setListDetails] = useState({});
  const [todoEdit, setTodoEdit] = useState("");
  const [timeoutId, setTimeoutId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = useContext(TokenContext);

  const { listId } = useParams();

  async function deleteTodo(ev, todoId, quickDelete = false) {
    if (quickDelete) {
      await destroyTodo({todoId, token})
    }
    if (ev.target.checked) {
      setTimeoutId(
        setTimeout(async () => {
          await destroyTodo({ todoId, token });
          getUsersTodoLists();
        }, 1500)
      );
    } else {
      clearTimeout(timeoutId);
      setTimeoutId("");
    }
  }
  
  async function deleteList(listId) {
    await destroyList({listId, token});
    getUsersTodoLists();
    navigate('/lists');
  }

  useEffect(() => {
    const curList = todoLists.filter(
      (list) => list.list_id === parseInt(listId)
    )[0];
    if (curList) {
      setTodosToDisplay(curList.todos);
      setListDetails(curList);
    } 
  }, [todoLists, listId]);

  //  && e.target.tagName !== "INPUT"
  // window.addEventListener("click", (e) => {
  //   if (todoEdit && e.target.tagName !== "INPUT") {
  //     console.log("todo", todoEdit);
  //     // setTodoEdit("");
  //   }
  // });

  return (
    <div id="todo-list">
      {errorMessage && <h1>{errorMessage}</h1>}
      <h1>{listDetails.title}</h1>
      {todosToDisplay.map((todo) => {
        return (
          <div key={todo.todo_id}>
            <div className="todo-item-container">
              <input
                value="delete"
                type="checkbox"
                name="delete"
                onClick={(ev) => deleteTodo(ev, todo.todo_id)}
              />
              {/* <Link to={`/lists/${listId}/todo/${todo.todo_id}/edit`}>{todo.title}</Link> */}
              {todoEdit === todo.todo_id ? (
                <EditTodo
                  todo={todo}
                  setTodoEdit={setTodoEdit}
                  getUsersTodoLists={getUsersTodoLists}
                  setErrorMessage={setErrorMessage}
                  deleteTodo={deleteTodo}
                />
              ) : (
                <div onClick={() => setTodoEdit(todo.todo_id)}>
                  <h4>{todo.title}</h4>
                  {todo.comment && <p>{todo.comment}</p>}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {addTodo && (
        <AddTodoForm
          token={token}
          navigate={navigate}
          getUsersTodoLists={getUsersTodoLists}
          setAddTodo={setAddTodo}
          setTodosToDisplay={setTodosToDisplay}
          todoLists={todoLists}
        />
      )}
      <Button
        variant="contained"
        color="ochre"
        onClick={() => setAddTodo(!addTodo)}
      >
        Add a todo
      </Button>
      <Button 
        variant="contained" 
        color="ochre"
        onClick={() => {
          deleteList(listId);
        }}>Delete List</Button>
      <Link to="/lists">
        <Button variant="contained" color="ochre">Close List</Button>
      </Link>
    </div>
  );
}


export default Todos;
