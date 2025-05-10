const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SECRET_KEY} = process.env;

const userRouter = Router();

const {
  createUser,
  findUserByUsername
} = require('../db')

const comparePassword = async (pw, hash) => {
  return await bcrypt.compare(pw, hash);
}

userRouter.get('/', async (req, res) => {
  try {
    res.send('GETTING USERS')
  } catch(ex) {
    console.log('error getting users in server');
    console.error(ex);
  }
})

userRouter.post('/register', async (req, res, next) => {
  try {
    const userExists = await findUserByUsername(req.body.name);

    if (userExists) {
      throw {
        message: 'This user already exists. Try logging in.',
        error: true
      };
    }
    
    const results = await createUser(req.body);
    const token = jwt.sign(results, SECRET_KEY);
    res.send({
      data: token,
      error: false,
      message: 'You have successfully registered!'
    })
  } catch(ex) {
    console.log('error registering a user in server');
    next(ex);
  }
})

userRouter.post('/login', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const results = await findUserByUsername(name);
    
    if (results && await comparePassword(password, results.password)) {
      delete results.password;
      const token = jwt.sign(results, SECRET_KEY);

      res.send({
        data: token,
        error: false,
        message: "You have successfully logged in!",
      });
    } else {
      next({
        message: 'Incorrect credentials, please try again.',
        error: true
      });
    };
    
  } catch(ex) {
    console.log('error logging in a user in server');
    next(ex);
  }
})


module.exports = userRouter;
