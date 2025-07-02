const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader)

    if (!authHeader) {
        return res.status(401).json({ status: false, message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log("token",token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("token",decoded)
        req.user = decoded; // attach user info from token to req.user
        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: "Invalid token." });
    }
  };

// Role-based access control
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.users.role)) {
            return res.status(403).json({ error: 'Not authorized to access this route' });
        }
        next();
    };
};