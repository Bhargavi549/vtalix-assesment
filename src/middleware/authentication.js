const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token']; 

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authMiddleware;
