var express = require('express')
var router = express.Router();
var getDB = require('../common/dbCon')
var mongodb = require('mongodb')
var ObjectId = mongodb.ObjectId

router.get('/get-product-by-id', async function (req, res, next) {
    try {
        var id = req.query.id;
        var db = await getDB()
        var collection = db.collection('products')
        var result = await collection.findOne({ _id: ObjectId.createFromHexString(id) })
        res.send(result)
    } catch (ex) {
        res.status(500).json({ msg: ex.message })
    }
})

module.exports = router;
