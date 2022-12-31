import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

function Lists({todoLists}) {
  
  return (
    <div>
      {
        todoLists && todoLists.map(list => {
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
