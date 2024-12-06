var express = require('express');
var router = express.Router();
var verifyToken = require('../common/verifyToken')
var getDB = require('../common/dbCon')
var objectId = require('mongodb').ObjectId
router.post('/save', verifyToken, async function (req, res, next) {
    try {
        var data = req.body.data;
        const db = await getDB()
        var collection = db.collection('address')
        var result = await collection.insertOne(data);
        res.send(result);
    } catch (ex) {
        res.status(500).json({ msg: ex.message })
    }

});
router.get('/get', verifyToken, async function (req, res, next) {
    try {
        const db = await getDB()
        var collection = db.collection('address')
        var result = await collection.find({}).toArray();
        res.send(result);
    } catch (ex) {
        res.status(500).json({ msg: ex.message })
    }
});
router.delete('/delete', verifyToken, async function (req, res, next) {
    try {
        var id = req.query.id;
        const db = await getDB()
        var collection = db.collection('address')
        var result = await collection.deleteOne({ _id: objectId.createFromHexString(id) });
        res.send(result);
    } catch (ex) {
        res.status(500).json({ msg: ex.message })
    }
})
router.put('/update/:id', verifyToken, async function (req, res, next) {
    try {
        var data = req.body.data;
        var id = req.params.id
        const db = await getDB()
        var collection = db.collection('address')
        var result = await collection.updateOne({ _id: objectId.createFromHexString(id), $set: data });
        res.send(result);
    } catch (ex) {
        res.status(500).json({ msg: ex.message })
    }
})

module.exports = router;