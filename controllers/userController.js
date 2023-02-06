const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Sikdang = require('../models/sikdangModel');
const AppError = require('../utils/appError');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.getUser = catchAsync(async (req, res, next) => {
  console.log('getUser req', req.params);
  const user = await User.findById(req.params.id).populate('sikdangs');
  console.log('user', user);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    user,
    status: 'success',
  });
  // res.status(500).json({
  //   status: 'error',
  //   message: 'This route is not yet defined!',
  // });
});
exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    user,
    status: 'success',
    message: '유저정보를 업데이트했습니다.',
  });
});
exports.addSikdangToUser = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;
  const sikdangId = req.params.id;
  let user = await User.findById(userId);
  let sikdang = await Sikdang.findById(sikdangId);
  if (!sikdang) {
    return next(new AppError('존재하지않는 식당입니다.', 404));
  }
  if (!user.sikdangs.includes(sikdangId)) {
    user.sikdangs.push(sikdangId);
  } else {
    return next(new AppError('이미 상담신청한 식당입니다', 406));
  }

  user = await User.findByIdAndUpdate(userId, user, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    user,
    status: 'success',
    message: '"상담신청 성공☺️. 프로필에서 확인할 수 있습니다."',
  });
});
// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!',
//   });
// };

// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!',
//   });
// };
