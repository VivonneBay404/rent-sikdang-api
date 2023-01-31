const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름은 반드시 입력해야합니다.'],
  },
  email: {
    type: String,
    required: [true, '이메일은 반드시 입력해야합니다.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, '이메일 형식이 아닙니다.'],
  },
  password: {
    type: String,
    required: [true, '비밀번호를 입력해주세요'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, '비밀번호를 확인해주세요'],
    validate: {
      //create,save에만 작동
      validator: function (el) {
        return el === this.password;
      },
      message: '비밀번호가 다릅니다',
    },
  },
});

userSchema.pre('save', async function (next) {
  //비밀번호가 생기거나 변할때만 작동
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
