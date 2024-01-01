const BASE_URL = 'http://localhost:3000/api'

export async function loginUser({username, password}) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        password: password
      })
    })
    
    const results = await response.json();
    
    return results;
    
  } catch(ex) {
    console.log('error in loginUser http method')
  }
}

export async function registerUser({username, email, password}) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        password,
        email
      })
    })
    
    const results = await response.json();
    
    return results;
    
  } catch(ex) {
    console.log('error in loginUser http method')
  }
}


export async function fetchUsersTodoLists(token) {
  try {
    const response = await fetch(`${BASE_URL}/lists`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const results = await response.json();

    return results;
  } catch(ex) {
    console.log('error in fetching users todo Lists')
  }
}

export async function fetchAllUsersTodos(token) {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const results = await response.json();

    return results;
  } catch(ex) {
    console.log('error in fetching users todo Lists')
  }
}

export async function addTodoToList({todo, listId, token}) {
  try {
    const response = await fetch(`${BASE_URL}/lists/${listId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        todo
      })
    })
    
    return response.json();
    
  } catch(ex) {
    console.log('error in addingTodoToList http method');
  }
}


export async function destroyTodo({todoId, token}) {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        todoId
      })
    })
    
    const results = response.json();
    return results;
  } catch(ex) {
    console.log('error in deleteTodo http method')
  }
}


export async function getTodoByTodoId(todoId, token) {
  try {
    const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    
    return response.json();
  } catch(ex) {
    console.log('error in getTodoByTodoId http method')
  }
}


export async function updateTodo(todoId, title, token) {
  try {
    await fetch(`${BASE_URL}/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title
      })
    })
  } catch(ex) {
    console.log('error in updateTodo http method')
  }
}

export async function addTodoNote(todoId, noteText, token) {
  try {
    const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        noteText
      })
    })
    
    return response.json();
  } catch(ex) {
    console.lgo('error in addTodoNote http method');
  }
}
