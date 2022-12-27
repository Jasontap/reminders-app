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


export async function fetchUsersTodoLists(token) {
  try {
    console.log("hitting http method");
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
    console.log("hitting http method");
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
    const response = fetch(`${BASE_URL}/lists/${listId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        todo
      })
    })
    
    const result = response.json();
    
  } catch(ex) {
    console.log('error in addingTodoToList http method');
  }
}
