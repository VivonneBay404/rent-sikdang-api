const express = require('express');
const router = express.Router();

const sikdangController = require('../controllers/sikdangController');

router
  .route('/')
  .get(sikdangController.getAllSikdangs)
  .post(sikdangController.createSikdang);

router.route('/:id').get(sikdangController.getSikdang);

module.exports = router;
