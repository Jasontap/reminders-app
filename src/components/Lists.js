import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

function Lists({todoLists}) {
  console.log(todoLists)
  
  return (
    <div>
      {
        todoLists.length && todoLists.map(list => {
          return (
            <Link 
              to={`/lists/${list.list_id}`} 
              key={list.list_id}
            >{list.title}</Link>
          )
        })
      }
    </div>
  )
}

export default Lists;
