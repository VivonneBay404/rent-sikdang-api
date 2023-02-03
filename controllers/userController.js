const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.getUser = catchAsync(async (req, res) => {
  console.log('getUser req', req.params);
  const user = await User.findById(req.params.id);
  console.log('user', user);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    user,
  });
  // res.status(500).json({
  //   status: 'error',
  //   message: 'This route is not yet defined!',
  // });
});
// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined!',
//   });
// };
// exports.updateUser = (req, res) => {
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
