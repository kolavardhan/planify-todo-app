const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization
    
    const token = authHeaders.split(' ')[1]

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decode
 
    next()
}
 
module.exports = authMiddleware
// Frontend
//      │
//      │  Authorization: Bearer <JWT_TOKEN>
//      ▼
// authMiddleware
//      │
//      ├── Extract token
//      ├── Verify token
//      ├── Decode user id
//      └── Attach it to req.user
//      ▼
// Todo Controller