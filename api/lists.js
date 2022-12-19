const {Router} = require('express');
const listRouter = Router();
const {
  getListsByUserId,
  findUserByUsername
} = require('../db')


listRouter.get('/', async (req, res, next) => {
  try {
    const {user} = req;
    if (user) {
      const results = await getListsByUserId(user.user_id);
      res.send(results)
    } else {
      res.send({
        data: [],
        message: 'You must be logged in.',
        error: true
      })
    }
  } catch(ex) {
    console.log('error in GET lists handler');
    next({
      message: 'There was an error finding your lists!',
      error: ex
    });
  }
})


module.exports = listRouter;
