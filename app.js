const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const sikdangRouter = require('./routes/sikdangRouter');

const app = express();


if (process.env.NODE_ENV === 'development') {
  console.log('env dev');
  app.use(morgan('dev'));
}

//req 접근
app.use(express.json());
app.use(cors());

app.use('/api/v1/sikdang', sikdangRouter);

module.exports = app;
