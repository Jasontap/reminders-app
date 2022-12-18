const { Router } = require('express');

const router = Router();
const userRouter = require('./users');
const listRouter = require('./lists');

router.get('/', (req, res, next) => {
  console.log('router')
})

router.use('/users', userRouter);
router.use('/lists', listRouter);

module.exports = router;
