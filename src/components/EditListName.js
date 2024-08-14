import React, {useState, useContext} from 'react';
import { TokenContext } from "../Context";
import {updateListName} from '../http-methods';

function EditListName ({listDetails, setListNameEdit}) {
  const [listName, setListName] = useState(listDetails.title);
  
  const token = useContext(TokenContext);
  
  async function submitListChange(e) {
    e.preventDefault();
    listDetails.title = listName;
    updateListName({listDetails, token});
    setListNameEdit(false);
  }
  
  return (
    <>
      <form onSubmit={(e) => submitListChange(e)}>
        <input
          type="text"
          value={listName}
          onChange={(e) => {
            setListName(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditListName;
