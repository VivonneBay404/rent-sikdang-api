const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  //jwt 토큰 생성
  const token = signToken(newUser._id);

  res.status(201).json({
    user: newUser,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('이메일과 비밀번호를 입력해주세요', 400));
  }
  //user에 password 프로퍼티 추가
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('이메일 혹은 비밀번호가 틀립니다', 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    user,
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  console.log('req', req.headers);
  //토큰이 있는지 확인
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log('token', token);
  }
  if (!token) {
    return next(new AppError('로그인이 안되있습니다', 401));
  }
  //토큰 validation

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log('decoded', decoded);

  //user check

  //토큰이 발행된후 비밀번호를 바꿧는지 확인인
  next();
});
