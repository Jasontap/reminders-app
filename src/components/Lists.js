import React from 'react';
import {Link} from 'react-router-dom';

function Lists({todoLists, setAllTodos}) {

  
  return (
    <div>
      {
        todoLists && todoLists.map(list => {
          return (
            <Link to={`/todos/${list.list_id}`} key={list.list_id}>{list.title}</Link>
          )
        })
      }
    </div>
  )
}

export default Lists;
