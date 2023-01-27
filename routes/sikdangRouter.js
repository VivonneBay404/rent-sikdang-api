const express = require('express')
const router = express.Router()
const dummyData = require('../asset/dummyData')

router.route('/').get((req,res) => {
    res.status(200).json({
        status: 'success',
        data: dummyData
    })
})
router.route('/:id').get((req,res) => {
    res.status(200).json({
        status: 'success',
        data: dummyData[req.params.id]
    })
})

module.exports = router