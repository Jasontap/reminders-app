const BASE_URL = 'http://localhost:3000/api'

export async function loginUser({username, password}) {
  try {
    console.log('hitting http method')
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

