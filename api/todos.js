const { Router } = require('express');
const todosRouter = Router();
const {requireUser} = require('./utils');

todosRouter.get('/', requireUser, async (req, res, next) => {
  try {
    console.log('GETTING USERS TODOS!')
  } catch(ex) {
    next({
      error: true,
      message: "error in todosRouter GET users todos",
    });
  }
})

module.exports = todosRouter;
