var express = require('express');
var router = express.Router();
var getDB = require('../common/dbCon')
var jwt = require('jsonwebtoken')
var verifyToken = require('../common/verifyToken')
router.post('/register', async function (req, res, next) {
  try {
    const data = req.body.data;
    const db = await getDB();
    const collection = db.collection("customers");

    // Check if the user already exists
    const userInfo = await collection.find({ $or: [{ "email": data.email }, { "phone": data.phone }] }).toArray();
    if (userInfo.length > 0) {
      // Send error response with a 400 status code
      return res.status(400).json({ success: false, message: "User details already existed" });
    }

    // Insert new user data
    const result = await collection.insertOne(data);
    res.status(201).json(result);
  } catch (error) {
    // Send error response with a 500 status code for unexpected errors
    res.status(500).json({ success: false, message: "Something went wrong " });
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const data = req.body.data;
    const db = await getDB()
    const collection = db.collection('customers')
    const result = await collection.find(data).toArray()
    res.send(result)
  } catch (ex) {
    res.send({ msg: ex.message })
  }
})

router.post('/get-token', async function (req, res, next) {
  try {
    const data = req.body.data;
    const token = jwt.sign(data, "appToken")
    res.send(token)
  } catch (ex) {
    res.send({ msg: ex.message })
  }
})

router.get(
  '/orders',
  verifyToken,
  async function (req, res, next) {
    try {
      const data = req.body.data;
      const db = await getDB()
      const collection = db.collection("orders")
      const result = await collection.find(data).toArray()
      res.send(result)
    } catch (ex) {
      res.send({ msg: ex.message })
    }
  }
)
router.get(
  '/cart',
  verifyToken,
  async function (req, res, next) {
    try {
      const data = req.body.data;
      const db = await getDB()
      const collection = db.collection("cart")
      const result = await collection.find(data).toArray()
      res.send(result)
    } catch (ex) {
      res.send({ msg: ex.message })
    }
  }
)


module.exports = router;
