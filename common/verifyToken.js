var jwt = require('jsonwebtoken')
function verifyToken(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'appToken', (err) => {
            if (err) {
                res.send('Invalid token')
            } else {
                next();
            }
        })
    } else {
        res.send("Token missing")
    }
}
module.exports = verifyToken