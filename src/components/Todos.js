import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import AddTodoForm from './AddTodoForm';
import { destroyTodo } from '../http-methods';

function Todos({todosToDisplay, token, navigate, getUsersTodoLists, setTodosToDisplay, todoLists}) {
  const [addTodo, setAddTodo] = useState(false);
  
  const {listId} = useParams();
  
  function activateAddTodoForm() {
    setAddTodo(true);
  }
  
  function deleteTodo(ev, todoId) {
    setTimeout(async () => {
      await destroyTodo({todoId, token});
      getUsersTodoLists();
    }, 1500);
  }
  
  useEffect(() => {
    const list = todoLists.filter((list) => list.list_id === parseInt(listId))[0];
    if (list) {
      setTodosToDisplay(list.todos)
    }
  }, [todoLists, listId])

  return (
    <div>
      {
        !!todosToDisplay.length && todosToDisplay.map(todo => {
          return (
            <div key={todo.todo_id}>
              <div>
                <input type='radio' onClick={(ev) => deleteTodo(ev, todo.todo_id)}/>
                <h4>{todo.title}</h4>
              </div>
              {todo.comment && <p>{todo.comment}</p>}
            </div>
          );
        })
      }
      {
        addTodo && <AddTodoForm 
          token={token} 
          navigate={navigate}
          getUsersTodoLists={getUsersTodoLists}
          setAddTodo={setAddTodo}
          setTodosToDisplay={setTodosToDisplay}
          todoLists={todoLists}
        />
      }
      {
        !!todosToDisplay.length && 
          <button onClick={() => activateAddTodoForm()}>Add a todo</button>
      }
      <Link to='/'>Close List</Link>
    </div>
  )
}


export default Todos;
