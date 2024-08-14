import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from "@mui/material";
import './CSS/lists.css';

function Lists({todoLists}) {
  
  return (
    <div id="title-list">
      {todoLists.length &&
        todoLists.map((list) => {
          return (
            <Link
              to={`/lists/${list.list_id}`}
              key={list.list_id}
              id="list-item-container"
            >
              <Button variant="contained" color="ochre">{list.title}</Button>
            </Link>
          );
        })}
    </div>
  );
}

export default Lists;
