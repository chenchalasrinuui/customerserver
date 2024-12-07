var express = require('express')
var router = express.Router();
var verifyToken = require('../common/verifyToken')
var getDB = require('../common/dbCon')
router.post('/save', verifyToken, async function (req, res, next) {
    try {
        const data = req.body.data;
        const db = await getDB()
        const collection = db.collection('orders')
        const result = await collection.insertOne(data)
        res.send(result)
    } catch (ex) {
        res.status(500).json({ msg: ex.message })
    }

})

module.exports = router;