const dummyData = require('../asset/dummyData');

exports.getAllSikdangs = (req, res) => {
  console.log('dummyData', dummyData);
  res.status(200).json(dummyData);
};

exports.getSikdang = (req, res) => {
  res.status(200).json(dummyData[req.params.id]);
};
