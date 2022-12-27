import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { addTodoToList } from '../http-methods';

function AddTodoForm({token}) {
  const [todo, setTodo] = useState('');
  const {listId} = useParams();
  
  function addTodo(e) {
    e.preventDefault();
    addTodoToList({todo, listId});
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
