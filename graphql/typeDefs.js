
var { gql } = require('apollo-server-express')

var typeDefs = gql`
scalar JSON

type Products{
    _id:String
    name:String
    category:String
    cost:Int
    description:String
    file:String
}
input AddInput{
    custId:String
    address:String
}
type Query{
    login:JSON
    getName:String
    getProducts:[Products]
}
type Mutation{
    register:JSON
    saveAddress(data:AddInput):JSON
}
`
module.exports = typeDefs