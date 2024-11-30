var getDB = require('../common/dbCon')
var verifyTokenInGQ = require('../common/verifyTokenInGQ')
const resolvers = {
    Query: {
        login: function () {

        },
        getName: function () {
            return "Sachin from GQ"
        },
        getProducts: async function () {
            try {
                const db = await getDB()
                const products = db.collection("products")
                const result = await products.find().toArray()
                return result;
            } catch (ex) {
                return { msg: ex.message }
            }
        }
    },
    Mutation: {
        register: function () {

        },
        saveAddress: async function (a, payload, context, d) {
            try {
                const { custId, address } = payload?.data
                const token = context.headers['authorization'];
                await verifyTokenInGQ(token)
                const db = await getDB()
                const collection = db.collection("address")
                const result = await collection.updateOne(
                    { custId: custId }, // Find the document by custId
                    { $push: { address: address } } // Push the new address to the array
                );
                return result;
            } catch (ex) {
                return { msg: ex.message }
            }
        }
    }
}

module.exports = resolvers;