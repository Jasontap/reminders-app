
const requireUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send({
      data: [],
      message: 'You must be logged in.',
      error: true
    })
  }
}

module.exports = {requireUser};
