const { Router } = require('express');

const userRouter = Router();

const {
  createUser
} = require('../db')

userRouter.get('/', async (req, res) => {
  try {
    res.send('GETTING USERS')
  } catch(ex) {
    console.log('error getting users in server');
    console.error(ex);
  }
})

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const results = await createUser(req.body);
    console.log(results)
    res.send(results)
  } catch(ex) {
    console.log('error posting a user in server');
    console.error(ex);
  }
})

module.exports = userRouter;
