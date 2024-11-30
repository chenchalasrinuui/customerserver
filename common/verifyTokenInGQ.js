var jwt = require('jsonwebtoken')
function verifyTokenInGQ(token) {
    return new Promise(function (resolve, reject) {
        if (token) {
            jwt.verify(token, 'appToken', (err) => {
                if (err) {
                    reject('Invalid token')
                } else {
                    resolve()
                }
            })
        } else {
            reject("Token missing")
        }
    })


}
module.exports = verifyTokenInGQ


