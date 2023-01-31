const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const sikdangRouter = require('./routes/sikdangRouter');
const userRouter = require('./routes/userRouter');
const app = express();

if (process.env.NODE_ENV === 'development') {
  console.log('env dev');
  app.use(morgan('dev'));
}

//req 접근
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/api/v1/sikdang', sikdangRouter);
app.use('/api/v1/user', userRouter);
module.exports = app;
