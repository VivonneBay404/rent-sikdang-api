const express = require('express');
const morgan = require('morgan');

const sikdangRouter = require('./routes/sikdangRouter');

const app = express();

app.use(morgan('dev'));
//req 접근
app.use(express.json());

app.use('/api/v1/sikdang', sikdangRouter);

module.exports = app;
