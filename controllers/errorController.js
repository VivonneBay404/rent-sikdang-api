//global error handler
//param이 4개면 err middleware로 에러가 생기면 자동으로 여기로옴
module.exports = (err, request, res, next) => {
  // console.error('error Controller err', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
