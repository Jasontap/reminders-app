const { Router } = require('express');
const todosRouter = Router();
const {requireUser, Message} = require('./utils');
const {getTodosByUserId} = require('../db');

todosRouter.get('/', requireUser, async (req, res, next) => {
  try {
    const {user_id} = req.user;
    
    const todos = await getTodosByUserId(user_id);
    
    res.send(new Message(todos, 'success getting all of users todos', false))
    
  } catch(ex) {
    next(new Message([], 'error getting todos from todosRouter GET', true));
  }
})

module.exports = todosRouter;
