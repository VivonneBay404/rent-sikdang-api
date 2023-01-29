const mongoose = require('mongoose');

const sikdangSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '식당은 이름이 필요합니다.'],
  },
  maxPeople: {
    type: String,
  },
  minSpend: {
    type: String,
  },
  category: String,
});

const Sikdang = mongoose.model('Sikdang', sikdangSchema);

module.exports = Sikdang;
