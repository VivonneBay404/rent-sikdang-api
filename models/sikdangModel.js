const mongoose = require('mongoose');

const sikdangSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  maxPeople: {
    type: Number,
  },
  minSpend: {
    type: Number,
  },
  category: String,
  photos: [String],
});

const Sikdang = mongoose.model('Sikdang', sikdangSchema);

module.exports = Sikdang;
