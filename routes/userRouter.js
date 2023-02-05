const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);
router.patch('/:id/addSikdangToUser', userController.addSikdangToUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser);
//   .delete(userController.deleteUser);

module.exports = router;
