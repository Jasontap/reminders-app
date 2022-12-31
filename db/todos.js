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

const removeTodo = async (todoId, userId) => {
  try {
    await client.query(`
      DELETE FROM todos
      WHERE todo_id = $1
      AND "creatorId" = $2;
    `, [todoId, userId])
    
  } catch(ex) {
    console.log('error removing todo from database in DB adapter');
    console.error(ex);
  }
}


module.exports = {
  getAllTodos,
  createTodo,
  getTodosByUserId,
  removeTodo
}
