
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

class Message {
  constructor(data = [], message, error) {
    this.data = data;
    this.message = message;
    this.error = error;
  }
}

module.exports = {
  requireUser,
  Message
};
