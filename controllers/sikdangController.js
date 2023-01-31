const Sikdang = require('../models/sikdangModel');

exports.getAllSikdangs = async (req, res) => {
  console.log('req.query', req.query);

  //특정 필드 쿼리에서 삭제
  let queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  //크거나 작은 필드 몽구스에 맞게 변형
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log('queryStr', queryStr);

  queryObj = JSON.parse(queryStr);

  console.log('queryObj', queryObj);

  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  console.log('queryObj', queryObj);

  const query = Sikdang.find(queryObj);

  //필터링된 식당의 갯수
  const count = (await Sikdang.find(queryObj)).length;
  console.log('count', count);

  const sikdang = await query.skip(skip).limit(limit);
  res.status(200).json({ sikdang, count: count });
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
