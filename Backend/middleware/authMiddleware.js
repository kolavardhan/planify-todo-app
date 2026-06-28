const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'No token provided'
        })
    }
    
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