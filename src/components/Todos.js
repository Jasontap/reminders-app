import React, {useEffect, useState, createContext, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import AddTodoForm from './AddTodoForm';
import { destroyTodo } from '../http-methods';
import { TokenContext } from '../Context';
import { EditTodo } from './';
import './CSS/todos.css';

function Todos({
  todosToDisplay,
  navigate,
  getUsersTodoLists,
  setTodosToDisplay,
  todoLists,
}) {
  const [addTodo, setAddTodo] = useState(false);
  const [todoEdit, setTodoEdit] = useState("");
  const [timeoutId, setTimeoutId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = useContext(TokenContext);

  const { listId } = useParams();

  function activateAddTodoForm() {
    setAddTodo(true);
  }

  function deleteTodo(ev, todoId) {
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

  useEffect(() => {
    const list = todoLists.filter(
      (list) => list.list_id === parseInt(listId)
    )[0];
    if (list) {
      setTodosToDisplay(list.todos);
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
      {!!todosToDisplay.length &&
        todosToDisplay.map((todo) => {
          return (
            <div key={todo.todo_id}>
              <div class='todo-item-container'>
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
                    todoNote={todo.comment}
                    setTodoEdit={setTodoEdit}
                    getUsersTodoLists={getUsersTodoLists}
                    setErrorMessage={setErrorMessage}
                    deleteTodo={deleteTodo}
                  />
                ) : (
                  <div onClick={() => setTodoEdit(todo.todo_id)}>
                    <h4>
                      {todo.title}
                    </h4>
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
      {!!todosToDisplay.length && (
        <button onClick={() => activateAddTodoForm()}>Add a todo</button>
      )}
      <Link to="/">Close List</Link>
    </div>
  );
}


export default Todos;
