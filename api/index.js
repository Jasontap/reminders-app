const { Router } = require('express');

const router = Router();
const userRouter = require('./users');

router.get('/', (req, res, next) => {
  console.log('router')
})

router.use('/users', userRouter);

module.exports = router;
