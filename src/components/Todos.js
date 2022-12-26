import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Todos({todosToDisplay}) {
  const [addTodo, setAddTodo] = useState(false);
  
   
  
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
        
      }
      {
        !!todosToDisplay.length && 
          <button onClick={() => console.log('prepared to add another task')}>Add a todo</button>
      }
      <Link to='/'>Close List</Link>
    </>
  )
}


export default Todos;
