const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

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

//없는 라우트 에러 핸들링
//항상 라우트 맨밑에 있어야함
// next() 에 아규먼트 넣으면 express는 자동으로 err로 받음 -> globalErrorHandler로 이동
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} 는 없는 라우트입니다.`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
