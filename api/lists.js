const {Router} = require('express');
const listRouter = Router();

const {
  getListsByUserId,
  getTodosByUserId,
  createTodo
} = require('../db')

const {requireUser} = require('./utils');


listRouter.get('/', requireUser, async (req, res, next) => {
  try {
    const {user} = req;
    const lists = await getListsByUserId(user.user_id);
    const todos = await getTodosByUserId(user.user_id);

    lists.forEach((list) => {
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
    
    res.send(lists)
  } catch(ex) {
    console.log('error in GET lists handler');
    next({
      message: 'There was an error finding your lists!',
      error: ex
    });
  }
})

listRouter.post('/:listId', requireUser, async (req, res, next) => {
  try {
    const {listId} = req.params;
    const {user} = req;
    const {todo} = req.body;
    
    await createTodo({title: todo, comment: '', creatorId: user.user_id, listId})
    
  } catch(ex) {
    console.log('error posting a todo to a list in list router')
    next({
      message: 'error posting a todo to a list in list router',
      error: ex
    })
  }
})


module.exports = listRouter;
