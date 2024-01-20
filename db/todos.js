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
    const {rows: [todo]} = await client.query(`
      INSERT INTO todos(title, comment, "creatorId", list_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [title, comment, creatorId, listId]);
    
    return todo;
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

const getTodoByTodoId = async (todoId) => {
  try {
    const {rows: [todo]} = await client.query(`
      SELECT * FROM todos
      WHERE todo_id = $1;
    `, [todoId])
    
    return todo;
  } catch(ex) {
    console.log('error searching for todo by todoID in the DB adapter');
    console.error(ex);
  }
}

const updateTodo = async (todoId, title) => {
  try {
    await client.query(`
      UPDATE todos
      SET title = $1
      WHERE todo_id = $2;
    `, [title, todoId]);
  } catch(ex) {
    console.log('error updating todo in DB adapter');
    console.error(ex);
  }
}

const attachTodoNote = async (todoId, noteText) => {
  try {
    await client.query(`
      UPDATE todos
      SET comment = $1
      WHERE todo_id = $2;
    `, [noteText, todoId]);
    
  } catch(ex) {
    console.log('error attaching note to todo in DB adapter')
    console.error(ex);
  }
}

const clearTodoNote = async (todoId) => {
  try {
    await client.query(`
    UPDATE todos
    SET comment = ''
    WHERE todo_id = $1;
    `, [todoId]);
    
  } catch(ex) {
    console.log("error clearing note from todo in DB adapter");
    console.error(ex);
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodosByUserId,
  removeTodo,
  getTodoByTodoId,
  updateTodo,
  attachTodoNote,
  clearTodoNote
}
