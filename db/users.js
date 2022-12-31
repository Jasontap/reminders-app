const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async ({name, email, password}) => {
  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    
    const {rows: [newUser]} = await client.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [name, email, hashed]);
    
    delete newUser.password;
    
    return newUser;
  } catch(ex) {
    console.log('error creating user in the DB adapter');
    console.error(ex);
  }
}

const findUserByUsername = async (name) => {
  try {
    console.log('FINDING USER', name)
    const {rows: [user]} = await client.query(`
      SELECT * FROM users
      WHERE name = $1;
    `, [name])
    
    return user;
  } catch(ex) {
    console.log('error finding user by username in DB adapter');
    console.error(ex);
  }
}

const findUserById = async (userId) => {
  try {
    console.log('FINDING USER BY ID', userId)
    const {rows: [user]} = await client.query(`
      SELECT * FROM users
      WHERE user_id = $1;
    `, [userId])
    
    return user;
  } catch(ex) {
    console.log('error finding user by ID in the DB adapter');
    console.log(ex);
  }
}


module.exports = {
  createUser,
  findUserByUsername,
  findUserById
}
