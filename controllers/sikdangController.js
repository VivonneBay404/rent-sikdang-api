const Sikdang = require('../models/sikdangModel');

exports.getAllSikdangs = async (req, res) => {
  console.log('req.query', req.query);
  const sikdangs = await Sikdang.find(req.query);

  res.status(200).json(sikdangs);
};

exports.getSikdang = async (req, res) => {
  try {
    const sikdang = await Sikdang.findById(req.params.id);

    res.status(200).json(sikdang);
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.createSikdang = async (req, res) => {
  console.log('req', req);
  console.log('req.body', req.body);
  const newSikdang = await Sikdang.create(req.body);
  res.status(201).json(newSikdang);
};
