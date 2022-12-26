import React from 'react';
import {Link} from 'react-router-dom';

function Lists({todoLists, setTodosToDisplay}) {
  function setListOfTodos(listId) {
    const [list] = todoLists.filter(list => list.list_id === listId);
    setTodosToDisplay(list.todos)
  }
  
  return (
    <div>
      {
        todoLists && todoLists.map(list => {
          return (
            <Link 
              to={`/todos/${list.list_id}`} 
              key={list.list_id}
              onClick={(e) => setListOfTodos(list.list_id)}
            >{list.title}</Link>
          )
        })
      }
    </div>
  )
}

export default Lists;
