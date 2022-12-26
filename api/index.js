const { Router } = require('express');

const router = Router();
const userRouter = require('./users');
const listRouter = require('./lists');
const todosRouter = require('./todos');

router.get('/', (req, res, next) => {
  console.log('router')
})

router.use('/users', userRouter);
router.use('/lists', listRouter);
router.use('/todos', todosRouter);

module.exports = router;
