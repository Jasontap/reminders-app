const {Router} = require('express');
const listRouter = Router();
const {
  getListsByUserId,
  getTodosByUserId
} = require('../db')
const {requireUser} = require('./utils');


listRouter.get('/', requireUser, async (req, res, next) => {
  try {
    const {user} = req;
    const results = await getListsByUserId(user.user_id);
    const todos = await getTodosByUserId(user.user_id);
    results.forEach((list) => {
      todos.forEach(todo => {
        if (todo.list_id === list.list_id) {
          if (list.todos) {
            list.todos.push(todo)
          } else {
            list.todos = [todo]
          }
        }
      })
    })
    res.send(results)
  } catch(ex) {
    console.log('error in GET lists handler');
    next({
      message: 'There was an error finding your lists!',
      error: ex
    });
  }
})


module.exports = listRouter;
