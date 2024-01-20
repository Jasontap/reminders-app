import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { TokenContext } from '../Context';
import { updateTodo, addTodoNote, clearTodoNote } from '../http-methods';

function EditTodo({ 
  todo, 
  setTodoEdit, 
  getUsersTodoLists, 
  setErrorMessage, 
  todoNote,
  deleteTodo
}) {
  const { todo_id, title } = todo;
  const [todoTitle, setTodoTitle] = useState(title);
  const [noteText, setNoteText] = useState(todoNote);
  const token = useContext(TokenContext);
  // const {listId, todoId} = useParams();

  async function submitTodo(e) {
    e.preventDefault();
    if (todoTitle === '') {
      e.target.checked = true;
      deleteTodo(e, todo_id, true);
      setTodoEdit("");
      await getUsersTodoLists(token);
      return;
    }
    if (noteText === '') {
      // *****************************************
      // need to delete the note text from the todo
    }
    
    await updateTodo(todo_id, todoTitle, token);
    
    if (noteText) {
      const addNoteResponse = await addTodoNote(todo_id, noteText, token);
      if (addNoteResponse.error) {
        setErrorMessage(addNoteResponse.message);
      }
    }
    setTodoEdit("");
    await getUsersTodoLists(token);
  }

  return (
    <>
      <form onSubmit={(e) => submitTodo(e)}>
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="add note"
          value={noteText}
          onChange={(e) => {
            setNoteText(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditTodo;
