const { Router } = require('express');
const todosRouter = Router();
const {requireUser, Message} = require('./utils');
const {
  getTodosByUserId,
  removeTodo,
  getTodoByTodoId,
  updateTodo
} = require('../db');

todosRouter.get('/:todoId', requireUser, async (req, res, next) => {
  try {
    const {todoId} = req.params;
    const todo = await getTodoByTodoId(todoId);

    if (todo.creatorId === req.user.user_id) {
      res.send(new Message(todo, 'success fetching todo by todoID!', false))
    } else {
      next(new Message([], 'you are not authorized to access that todo', true))
    }
  } catch(ex) {
    next(new Message([], 'error getting todo by todoId in the todos router', true))
  }
})

todosRouter.get('/', requireUser, async (req, res, next) => {
  try {
    const {user_id} = req.user;
    
    const todos = await getTodosByUserId(user_id);
    
    res.send(new Message(todos, 'success getting all of users todos', false))
    
  } catch(ex) {
    next(new Message([], 'error getting todos from todosRouter GET', true));
  }
})

todosRouter.delete('/', requireUser, async (req, res, next) => {
  try {
    const {todoId} = req.body;
    const {user_id} = req.user;
    await removeTodo(todoId, user_id);
    res.send({
      message: 'success deleting todo!'
    })
  } catch(ex) {
    next(new Message([], 'error deleting todo in todosRouter DETELET', true))
  }
})

todosRouter.put('/:todoId', requireUser, async (req, res, next) => {
  
  try {
    const {todoId} = req.params;
    const {title } = req.body;
    const todo = await getTodoByTodoId(todoId);
    
    if (todo && todo.creatorId === req.user.user_id) {
      const newTodo = {...todo, title};
      await updateTodo(todoId, title);
      
      res.send({
        data: newTodo,
        message: 'Thank you. Your todo has been updated!',
        error: false
      })
    } else {  
      res.send({
        data: [],
        message: 'Sorry, there was an issue finding your todo. Please refresh the page and try again.',
        error: true
      })
    }
  } catch(ex) {
    next(new Message([], 'error updating todo in todosRouter PUT', true))
  }
})

module.exports = todosRouter;
