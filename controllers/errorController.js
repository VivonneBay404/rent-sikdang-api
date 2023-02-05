// const AppError = require('../utils/appError');

// const handleCastErrorDB = (err) => {
//   const message = `틀린 ${err.path}: ${err.value}`;
//   return new AppError(message, 404);
// };

// const sendErrorDev = (err, res) => {
//   res.status(err.statusCode).json({
//     status: err.status,
//     error: err,
//     message: err.message,
//     stack: err.stack,
//   });
// };
// const sendErrorProd = (err, res) => {
//   //Operational err
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//     //Programming err
//   } else {
//     console.error('ERROR 😨', err);
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went wrong',
//     });
//   }
// };

//global error handler
//param이 4개면 err middleware로 에러가 생기면 자동으로 여기로옴
module.exports = (err, request, res, next) => {
  // console.error('error Controller err', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // if (process.env.NODE_ENV === 'development') {
  //   sendErrorDev(err, res);
  // } else if (process.env.NODE_ENV === 'production') {
  //   let error = { ...err };
  //   console.log('error', error);
  //   if (error.name === 'CastError') error = handleCastErrorDB(error);
  //   sendErrorProd(error, res);
  // }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
