var mongodb = require('mongodb')
async function getDB() {
    var url = "mongodb+srv://nit:nit@7amcluster.ilg9t.mongodb.net/"
    var mongoClient = mongodb.MongoClient;
    var server = await mongoClient.connect(url)
    var db = server.db("7am")
    return db;
}

module.exports = getDB