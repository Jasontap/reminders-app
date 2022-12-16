const client = require('./client');

const createUser = async ({name, email, password}) => {
  const {rows: [newUser]} = await client.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [name, email, password])
  
  return newUser;
}


module.exports = {
  createUser
}
