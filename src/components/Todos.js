import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AddTodoForm from './AddTodoForm';

function Todos({todosToDisplay, token}) {
  const [addTodo, setAddTodo] = useState(false);
  
  function activateAddTodoForm() {
    setAddTodo(true);
  }

  return (
    <>
      {
        !!todosToDisplay.length && todosToDisplay.map(todo => {
          return (
            <div key={todo.todo_id}>
              {todo.title}
            </div>
          )
        })
      }
      {
        addTodo && <AddTodoForm token={token}/>
      }
      {
        !!todosToDisplay.length && 
          <button onClick={() => activateAddTodoForm()}>Add a todo</button>
      }
      <Link to='/'>Close List</Link>
    </>
  )
}


export default Todos;
