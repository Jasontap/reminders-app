const client = require('./client');

const getAllTodos = async () => {
  try {
    const {rows} = await client.query(`
      SELECT * FROM todos;
    `)
    
    return rows;
  } catch(ex) {
    console.log('error in getAllTodos adapter!');
  }
}

const createTodo = async ({title, comment, creatorId, listId}) => {
  try {
    await client.query(`
      INSERT INTO todos(title, comment, "creatorId", list_id)
      VALUES ($1, $2, $3, $4);
    `, [title, comment, creatorId, listId])
  } catch(ex) {
    console.log('error in createTodo adapter!');
    console.error(ex);
  }
}

const getTodosByUserId = async (userId) => {
  try {
    const {rows: todos} = await client.query(`
      SELECT * FROM todos
      WHERE "creatorId" = $1;
    `, [userId])
    
    return todos;
  } catch(ex) {
    console.log('error in getTodosByUserId adapter!');
    console.error(ex);
  }
}


module.exports = {
  getAllTodos,
  createTodo,
  getTodosByUserId
}
