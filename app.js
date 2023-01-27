const express = require('express')
const morgan = require('morgan')
 

const sikdangData = require('./asset/dummyData')

const app = express()
//req 접근
app.use(express.json());

app.get('/sikdang',(req,res )=> {
    res.send(sikdangData)
})
app.get('/sikdang/:id',(req,res)=> {
    res.send(sikdangData[req.params.id])
    console.log()
})

app.listen(3000, () => {
    console.log(`App running on port 3000...`);
  });

