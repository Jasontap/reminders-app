const { Router } = require('express');
const todosRouter = Router();
const {requireUser, Message} = require('./utils');
const {
  getTodosByUserId,
  removeTodo
} = require('../db');

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

module.exports = todosRouter;
