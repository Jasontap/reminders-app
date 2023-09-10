import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { addTodoToList } from '../http-methods';

function AddTodoForm({token, setAddTodo, getUsersTodoLists}) {
  const [todo, setTodo] = useState('');
  const {listId} = useParams();
  
  async function addTodo(e) {
    e.preventDefault();
    await addTodoToList({todo, listId, token});
    getUsersTodoLists();
    setAddTodo(false);
  }

  return (
    <form
      onSubmit={(e) => addTodo(e)}
    >
      <input
        type='text'
        onChange={(e) => {
          e.preventDefault();
          setTodo(e.target.value)
        }}
      />
    </form>
  )
}

export default AddTodoForm;
