const mongoose = require('mongoose');

const sikdangSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
