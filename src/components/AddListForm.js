import React, { useState } from "react";
import { createTodoList } from "../http-methods";

function AddListForm({ token, setAddList, getUsersTodoLists }) {
  const [title, setTitle] = useState("");

  async function addList(e) {
    e.preventDefault();
    const results = await createTodoList({ title, token });
    getUsersTodoLists();
    setAddList(false);
  }

  return (
    <form onSubmit={(e) => addList(e)}>
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setTitle(e.target.value);
        }}
      />
    </form>
  );
}

export default AddListForm;
