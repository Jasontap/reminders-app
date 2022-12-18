const {Router} = require('express');
const listRouter = Router();
const {
  getListByUserId,
  findUserByUsername
} = require('../db')


listRouter.get('/', async (req, res, next) => {
  try {
    const results = await getListByUserId()
    res.send('Hey we are working on it!')
  } catch(ex) {
    console.log('error in GET lists handler');
    next({
      message: 'There was an error finding your lists!',
      error: ex
    });
  }
})


module.exports = listRouter;
