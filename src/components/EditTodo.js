import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { TokenContext } from '../Context';
import { updateTodo } from '../http-methods';

function EditTodo({todo, setTodoEdit}) {
  const {todo_id, title} = todo;
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [errorMessage, setErrorMessage] = useState('');
  const token = useContext(TokenContext);
  // const {listId, todoId} = useParams();
  
  async function submitTodo(e) {
    e.preventDefault();
    await updateTodo(todo_id, todoTitle, token)
    setTodoEdit('');
  }
  
  return (
    <>
      {errorMessage && <h1>{errorMessage}</h1>}
      <form onSubmit={(e) => submitTodo(e)}>
        <input 
          type='text' 
          value={todoTitle}
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
      </form>
    </>
  )
}

export default EditTodo;
