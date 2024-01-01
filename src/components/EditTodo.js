import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { TokenContext } from '../Context';
import { updateTodo, addTodoNote } from '../http-methods';

function EditTodo({ todo, setTodoEdit, getUsersTodoLists, setErrorMessage}) {
  const { todo_id, title } = todo;
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [noteText, setNoteText] = useState("");
  const token = useContext(TokenContext);
  // const {listId, todoId} = useParams();

  async function submitTodo(e) {
    e.preventDefault();
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
          placeholder="Add Note"
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
