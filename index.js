const express = require('express');
const morgan = require('morgan');
const router = require('./api/index');
const client = require('./db/client');

const server = express();

const PORT = process.env.PORT || 3000;

server.use(morgan('dev'));
server.use(express.json());

server.use((req, res, next) => {
  console.log('HITTING SERVER');
  next();
})

server.use('/api', router);

server.get('*', (req, res, next) => {
  res.send('YOU REACHED THE SERVER')
})

server.listen(PORT, () => {
  client.connect();
  console.log(`Server up and running on port: ${PORT}`)
})
